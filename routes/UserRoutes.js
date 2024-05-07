
const express = require('express');
const User = require('../db/UserModel');
const userRoutes = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const upload = require('../middleware/fileUpoad')
const nodemailer = require('nodemailer');
userRoutes.post('/register', upload.single('image'), async (req, res) => {
    try {
        const { username, email, password,image } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Check if the username and image fields are presentnp
        if (!username || !req.file || !req.file.filename) {
            return res.status(400).json({ error: 'Username and image are required' });
        }

        const user = new User({ username, email, password: hashedPassword, image: req.file.filename });
        await user.save();
        res.send('User registered successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

userRoutes.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ userId: user._id }, 'secret_key');
      res.json({ token });
      res.cookie('token', token, { 
        httpOnly: true,
        expires: new Date(Date.now() + 3600000) 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Route for handling password reset requests
userRoutes.post('/forget-password', async (req, res) => {
    try {
        // Get email from request body
        const { email } = req.body;

        // Find user by email (replace this with your actual user retrieval logic)
        const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

        // Generate a random temporary password
        const tempPassword = Math.random().toString(36).slice(-8);

        // Hash the temporary password
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        // Update user's password with the temporary password (replace this with your actual password update logic)
        user.password = hashedPassword;

        // Send email with the temporary password
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aptech2201c1@gmail.com', // your Gmail email address
                pass: 'zkffxtckeiqdmcps' // yomuhammad1ur Gmail password
            }
        });

        const mailOptions = {
            from: 'aptech2201c1@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `Your temporary password is: ${tempPassword}. Please use this temporary password to log in and reset your password.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to send email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'Email sent successfully' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

userRoutes.post('/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Find user by email (replace this with your actual user retrieval logic)
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password with the new password (replace this with your actual password update logic)
        user.password = hashedPassword;

        // Send email notifying the user about the password change
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'aptech2201c1@gmail.com', // your Gmail email address
                pass: 'zkffxtckeiqdmcps' // your Gmail password
            }
        });

        const mailOptions = {
            from: 'aptech2201c1@gmail.com',
            to: email,
            subject: 'Password Reset Successful',
            text: `Your password has been reset successfully`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to send email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ message: 'Password reset successful. Email notification sent.' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


userRoutes.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user by ID
userRoutes.put('/update/:id',upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user properties
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;
    // if (image) user.image = req.file.filename;
    user.image = req.file.filename
    // Save updated user
    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = userRoutes






