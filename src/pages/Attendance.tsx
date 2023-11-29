import { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { useParams, useNavigate } from "react-router-dom";
import { getUserFromNIM } from "../lib/appwrite/api";
import { Models } from "appwrite";
import Success from "./Success";

type UserType = Models.Document;

function Attendance() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [user, setUser] = useState<UserType | null>(null);
  const [present, setPresent] = useState<boolean>(false);

  const { nim = "" } = useParams();
  const navigate = useNavigate();
  let faceMatcher: faceapi.FaceMatcher | undefined;

  useEffect(() => {
    const faceReg = async () => {
      try {
        const currentUser = await getUserFromNIM(nim);

        if (!currentUser) {
          navigate("/login");
          return;
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    faceReg();
  }, [nim]);

  useEffect(() => {
    if (user) {
      startVideo();
      videoRef.current && loadModels();
    }
  }, [user]);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLabeledFaceDescriptions = async () => {
    // console.log(user);
    const referenceImage = await faceapi.fetchImage(user?.face);
    const results = await faceapi
      .detectAllFaces(referenceImage)
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (!results.length) {
      return;
    }

    faceMatcher = new faceapi.FaceMatcher(results);
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(async () => {
      await getLabeledFaceDescriptions();
      faceMyDetect();
    });
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      if (videoRef.current) {
        const detection = await faceapi
          .detectSingleFace(videoRef.current!)
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (detection) {
          const resized = faceapi.resizeResults(detection, {
            width: 940,
            height: 650,
          });

          if (faceMatcher) {
            const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
            const threshold = 0.3;

            if (bestMatch.distance < threshold) {
              setPresent(true);
            }

            let personName: string;

            if (bestMatch.label !== "unknown") {
              personName = user?.name || "";
            } else {
              personName = "Unknown Person";
            }

            if (canvasRef.current) {
              const canvas = canvasRef.current;
              const context = canvas.getContext("2d");

              if (context) {
                faceapi.matchDimensions(canvas, {
                  width: 940,
                  height: 650,
                });

                const drawBox = new faceapi.draw.DrawBox(
                  resized.detection.box,
                  {
                    label: personName,
                  }
                );

                drawBox.draw(canvas);
              }
            }
          } else {
            console.log("Face matcher not initialized.");
          }
        } else {
          console.log("No face detected.");
        }
      }
    }, 100);
  };

  return (
    <>
      {present && user ? (
        <Success id={user.$id} />
      ) : (
        <div className="myapp">
          <h1>Face Detection</h1>
          <div className="appvide">
            <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
          </div>
          <canvas
            ref={canvasRef}
            width="940"
            height="650"
            className="appcanvas"
          ></canvas>
        </div>
      )}
    </>
  );
}

export default Attendance;
