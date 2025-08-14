import { ZapIcon } from 'lucide-react'

const RateLimiter = () => {
  return (
    <div className='max-w-6xl mx-auto px-40 py-8'>
        <div className='bg-gray-400 rounded-3xl shadow-md'>
            <div className='flex flex-col md:flex-row items-center p-6'>
                <div className='bg-gray-500 p-4 rounded-full mb-4 md:mb-0 md:mr-6'>
                    <ZapIcon className='size-10'/>
                </div>
                <div className='flex-1 text-center md:text-left'>
                    <h3 className='text-xl font-bold mb-2'>
                        Rate Limit Reached
                    </h3>
                    <p className='text-base-content mb-1'>
                        You have made too many requests. Please for a moment.
                    </p>
                    <p className='text-sm text-base-content/70'>
                        Try again in a few seconds.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RateLimiter
