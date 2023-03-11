import {DocumentMagnifyingGlassIcon} from '@heroicons/react/24/outline'


 const Homepage = () => {
    const flexCenter = 'flex justify-center items-center'
  return (
        <div className={`${flexCenter} flex-col`} >
            <DocumentMagnifyingGlassIcon className='w-64 h-64 text-indigo-600/20' />
            <h1 className='sm:text-4xl text-3xl font-bold'>Welcome to Amazon Web Scraper</h1>
        </div>
  )
}
export default Homepage