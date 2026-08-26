import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NoteNotFound from '../components/NoteNotFound'

const HomePage = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/note')
        console.log(res.data)
        setNotes(res.data)
      } catch (error) {
        console.log('Error in fetchNotes ', error)
        toast.error('Failed to load')
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className='min-h-screen bg-slate-950 text-white relative overflow-hidden'>

      {/* Background glow */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl' />
        <div className='absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl' />
        <div className='absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl' />
      </div>

      {/* Navbar */}
      <div className='relative z-10'>
        <Navbar />
      </div>

      {/* Main content */}
      <main className='relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-10'>

        {/* Hero section */}
<div className='mb-12 text-center'>
  <div className='inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 text-sm font-medium'>
    <span className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse' />
    Your personal workspace
  </div>

  <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight'>
    Your{' '}
    <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500'>
      thoughts.
    </span>
    <br />
    Your notes.
  </h1>

  <p className='mt-5 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed'>
    Capture ideas, organize your thoughts, and keep everything important
    in one beautiful place.
  </p>
</div>

        {/* Notes section */}
        <section>

          <div className='flex items-center justify-between mb-6'>
            <div>
              <h2 className='text-2xl font-semibold text-white'>
                Your Notes
              </h2>

              {!loading && (
                <p className='text-slate-500 text-sm mt-1'>
                  {notes.length} {notes.length === 1 ? 'note' : 'notes'} saved
                </p>
              )}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[1, 2, 3].map(item => (
                <div
                  key={item}
                  className='h-56 rounded-2xl border border-white/5 bg-white/[0.03] animate-pulse'
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && notes.length === 0 && (
            <div className='rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10'>
              <NoteNotFound />
            </div>
          )}

          {/* Notes */}
          {!loading && notes.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map(note => (
                <div
                  key={note._id}
                  className='group relative transition-all duration-300 hover:-translate-y-1'
                >
                  {/* Card glow */}
                  <div className='absolute -inset-0.5 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:via-blue-500/20 group-hover:to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500' />

                  <div className='relative'>
                    <NoteCard
                      note={note}
                      setNotes={setNotes}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>
      </main>
    </div>
  )
}

export default HomePage