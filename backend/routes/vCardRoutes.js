const express = require('express');
const router = express.Router();
const VCard = require('../models/VCard');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const { name, email, phone, address, company, jobTitle } = req.body;
    try {
        const vCard = new VCard({ userId: req.user.id, name, email, phone, address, company, jobTitle });
        await vCard.save();
        res.status(201).json(vCard);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const vCards = await VCard.find({ userId: req.user.id });
        res.json(vCards);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, address, company, jobTitle } = req.body;
    try {
        const vCard = await VCard.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { name, email, phone, address, company, jobTitle }, { new: true });
        if (!vCard) return res.status(404).json({ message: 'vCard not found' });
        res.json(vCard);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const vCard = await VCard.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!vCard) return res.status(404).json({ message: 'vCard not found' });
        res.json({ message: 'vCard deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
