import express from 'express'
import { deleteNotes, getNoteById, getNotes, postNotes, putNotes } from '../controller/notesController.js'

const router = express.Router()

router.get('/', getNotes)

router.get('/:id', getNoteById)

router.post('/', postNotes)

router.put('/:id', putNotes)

router.delete('/:id', deleteNotes)

export default router