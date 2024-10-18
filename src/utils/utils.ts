import winston from "winston";
import { cplFileURL, subFolders, filesPath, formDataMulterKey } from "./constant";
import jwt from "jsonwebtoken";
import unirest from "unirest";
import multer from "multer";

// This function is used to generate random numbers for OTP.
function randomNumber() {
  let number = Math.floor(1000 + Math.random() * 9000).toString(10);
  return parseInt(number);
}

async function sendOTP(mobile: number, otp: number, forgot: boolean) {
  try {
    var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
    req.headers({
      authorization: process.env.fast2SmsAuthKey,
    });
    let message: string;
    if (forgot === false)
      message = `Your verification OTP for Litchies SignUP is: \n ${otp}`;
    else message = `OTP for Forgot Password is: \n ${otp}`;
    req.form({
      route: "v3",
      sender_id: "FTWSMS",
      message: message,
      numbers: mobile,
    });
  
    req.end(function (res: any) {
      if (res.error) {
        console.log(res.error);
        throw new Error(res.error);
      }
  
      console.log(res.body);
    });
  } catch (err) {
    logger(false, "Sending OTP operation failed due to Internal Server Error.");
  }
}

function logger(status: Boolean, msg: String, res?: any) {
  // const logFilePath = resolve(__dirname, "./logs.log");

  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.prettyPrint()
    ),
    defaultMeta: { status: status, message: msg, result: res },
    transports: [
      // new winston.transports.File({ filename: logFilePath }),
      new winston.transports.Console(),
    ],
  });

  // if (!fs.existsSync(logFilePath)) {
  //   fs.writeFileSync(logFilePath, "");
  // }
  if (status == true) {
    return logger.info(msg);
  } else {
    return logger.error(msg);
  }
}

function createJWTToken(user) {
  const obj = user.toObject();
  const privateKey = process.env.token_secret;
  let token = jwt.sign(obj, privateKey, { expiresIn: "365d" });
  return token;
}

/**
 * 
 * @param path Subfolder of Image
 * @param file Image name
 * @returns Image Url
 */
function saveFilePath(subFolder: string, keyName: string) {
  let fileUrl = cplFileURL + subFolder + "/" + keyName;
  return fileUrl;
}

function uploadFileLocallyMulter() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      file.originalname = ImgWhiteSpaceRemove(file.originalname);
      if (file.fieldname === formDataMulterKey.testAndPackage) {
        cb(null, filesPath + subFolders.testPackages);
      } else if (file.fieldname === formDataMulterKey.report) {
        cb(null, filesPath + subFolders.report);
      }
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
    }
  });
  const upload = multer({
    storage: storage,
    // limits: { fileSize: (1024 * 1024 * parseInt(process.env.MAX_IMG_SIZE))  // 10 MB file size limit
    // } 
  });
  return upload;
}

 // This function needs req.body to Check User Input empty/null Or Not
function isEmptyBody(bodydata) {
  for (const key in bodydata) {
    let value = bodydata[key];
    if (typeof value === "string") {
      value = value.trim();
    }
    if (value === "") {
      return true;
    }
  }
  return false;
}

function ImgWhiteSpaceRemove(name) {
  return name.replace(/\s/g, "")
}

/**
 * 
 * @param token String
 * @returns Object
 */
function decodeJWTToken(token: string) {
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET as string, (error, decoded) => {
      return decoded;
    });
  }
}

export { logger, saveFilePath, decodeJWTToken, uploadFileLocallyMulter, sendOTP, randomNumber, createJWTToken, isEmptyBody };