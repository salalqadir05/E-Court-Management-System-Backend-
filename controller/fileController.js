const File = require("../models/File");
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;

const uploadFile = async (req, res) => {
  try {
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token if in" })
    }
        const jt =process.env.JWT_SECRET ;
         jwt.verify(token, jt,(err,data)=>{
          if(err)
          {
            res.json(err)
          }
          else{
          //  data = decoded;
            req.lawyer = data.checklawyer

          }
         })
         if (!req.lawyer || !req.lawyer.id) {
          return res.status(401).json({ error: "Invalid lawyer ID." });
        }
         const newFile = new File({
      filename: req.file.originalname,
      path: req.file.path,
      lawyer : req.lawyer.id
    });
    
    await newFile.save();
    res.status(201).send('File uploaded successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await File.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).send('File not found');
    }

    res.download(file.path, file.filename);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
const fetchdocuments = async (req,res)=>{
  try {
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token if in" })
    }
        const jt =process.env.JWT_SECRET ;
         jwt.verify(token, jt,(err,data)=>{
          if(err)
          {
            res.json(err)
          }
          else{
          //  data = decoded;
            req.lawyer = data.checklawyer

          }
         })
         if (!req.lawyer || !req.lawyer.id) {
          return res.status(401).json({ error: "Invalid lawyer ID." });
        }
        console.log("lawyer id is :", req.lawyer.id)
    const documents = await File.find({lawyer : req.lawyer.id});
        // console.log(documents)
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}
const updateFile = async (req, res) => {
  try {
    const token = req.header('auth-token');

    if (!token) {
      return res.status(401).send({ error: "Please authenticate using a valid token." });
    }

    const jt = process.env.JWT_SECRET;

    jwt.verify(token, jt, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        req.lawyer = data.checklawyer;
      }
    });

    if (!req.lawyer || !req.lawyer.id) {
      return res.status(401).json({ error: "Invalid lawyer ID." });
    }

    const fileId = req.params.id; // Assuming you pass the file ID in the URL

    const file = await File.findOne({ _id: fileId, lawyer: req.lawyer.id });

    if (!file) {
      return res.status(404).json({ error: 'File not found or not authorized to update.' });
    }

    // Update the file details if needed
    file.filename = req.body.newFilename || file.filename;

    // Save the updated file details
    await file.save();

    res.json({ message: 'File updated successfully.' });
  } catch (error) {
    console.error('Error updating file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const deleteFile = async (req, res) => {
  try {
    const token = req.header('auth-token');

    if (!token) {
      return res.status(401).send({ error: "Please authenticate using a valid token." });
    }

    const jt = process.env.JWT_SECRET;

    jwt.verify(token, jt, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        req.lawyer = data.checklawyer;
      }
    });

    if (!req.lawyer || !req.lawyer.id) {
      return res.status(401).json({ error: "Invalid lawyer ID." });
    }

    const fileId = req.params.id; // Assuming you pass the file ID in the URL

    const file = await File.findOne({ _id: fileId, lawyer: req.lawyer.id });

    if (!file) {
      return res.status(404).json({ error: 'File not found or not authorized to delete.' });
    }

    // Delete the file from the database
  await File.findByIdAndDelete(fileId);


    // Delete the file from the file system
    await fs.unlink(file.path);

    res.json({ message: 'File deleted successfully.' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const uploadFileForCaseManager = async (req, res) => {
  try {
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
      res.status(401).send({ error: "Please authenticate using a valid token." });
    }

    const jt = process.env.JWT_SECRET;
    jwt.verify(token, jt, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        console.log(data)
        req.casemanager = data.checkcasemanager; 
        console.log("id of case manager :",req.casemanager.id)
      }
    });

    if (!req.casemanager || !req.casemanager.id) {
      return res.status(401).json({ error: "Invalid case manager ID." });
    }

    const newFile = new File({
      filename: req.file.originalname,
      path: req.file.path,
      casemanager: req.casemanager.id
    });

    await newFile.save();
    res.status(201).send('File uploaded successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const downloadFileForCaseManager = async (req, res) => {
  try {
    const file = await File.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).send('File not found');
    }

    res.download(file.path, file.filename);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const fetchDocumentsForCaseManager = async (req, res) => {
  try {
    const token = req.header('auth-token');
    console.log(token)
    if (!token) {
      res.status(401).send({ error: "Please authenticate using a valid token." });
    }

    const jt = process.env.JWT_SECRET;
    jwt.verify(token, jt, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        req.casemanager = data.checkcasemanager; // Assuming case manager information is in the token payload
      }
    });

    if (!req.casemanager || !req.casemanager.id) {
      return res.status(401).json({ error: "Invalid case manager ID." });
    }

    console.log("Case manager ID is:", req.casemanager.id);
    const documents = await File.find({ casemanager: req.casemanager.id });
    res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateFileForCaseManager = async (req, res) => {
  try {
    const token = req.header('auth-token');

    if (!token) {
      return res.status(401).send({ error: "Please authenticate using a valid token." });
    }

    const jt = process.env.JWT_SECRET;

    jwt.verify(token, jt, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        req.caseManager = data; // Assuming case manager information is in the token payload
      }
    });

    if (!req.caseManager || !req.caseManager.id) {
      return res.status(401).json({ error: "Invalid case manager ID." });
    }

    const fileId = req.params.id; // Assuming you pass the file ID in the URL

    const file = await File.findOne({ _id: fileId, caseManager: req.caseManager.id });

    if (!file) {
      return res.status(404).json({ error: 'File not found or not authorized to update.' });
    }

    // Update the file details if needed
    file.filename = req.body.newFilename || file.filename;

    // Save the updated file details
    await file.save();

    res.json({ message: 'File updated successfully.' });
  } catch (error) {
    console.error('Error updating file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteFileForCaseManager = async (req, res) => {
  try {
    const token = req.header('auth-token');

    if (!token) {
      return res.status(401).send({ error: "Please authenticate using a valid token." });
    }

    const jt = process.env.JWT_SECRET;

    jwt.verify(token, jt, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        req.casemanager = data.checkcasemanager; // Assuming case manager information is in the token payload
      }
    });

    if (!req.casemanager || !req.casemanager.id) {
      return res.status(401).json({ error: "Invalid case manager ID." });
    }

    const fileId = req.params.id; // Assuming you pass the file ID in the URL

    const file = await File.findOne({ _id: fileId, casemanager: req.casemanager.id });

    if (!file) {
      return res.status(404).json({ error: 'File not found or not authorized to delete.' });
    }

    // Delete the file from the database
    await File.findByIdAndDelete(fileId);

    // Delete the file from the file system
    await fs.unlink(file.path);

    res.json({ message: 'File deleted successfully.' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  uploadFile,
  fetchdocuments,
  deleteFile,
  downloadFile,
  updateFile,
  uploadFileForCaseManager,
  fetchDocumentsForCaseManager,
  deleteFileForCaseManager,
  downloadFileForCaseManager,
  updateFileForCaseManager
};
