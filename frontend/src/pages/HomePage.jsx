import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimiter from '../components/RateLimiter'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NoteNotFound from '../components/NoteNotFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async () =>{
      try {
        const res = await api.get('/note')
        console.log(res.data);
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log('Error in fetchNotes ',error);
        if(error.response.status === 429){
          setIsRateLimited(true)
        }
        else{
          toast.error('Failed to load')
        }
      }finally{
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className='min-h-screen'>

      <Navbar />

      {isRateLimited && <RateLimiter />}
      <div className='max-w-6xl mx-auto p-4 m-6'>
        {loading && <div className='text-center text-4xl py-10'>Loading notes...</div> }

        {!loading && notes.length === 0 && !isRateLimited && <NoteNotFound />}
        {notes.length > 0 && !isRateLimited &&(
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {notes.map(note=>(
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
