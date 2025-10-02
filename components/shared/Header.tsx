const Header = () => {
  return (
    <div className="sticky top-0 z-50 w-full">
        <div className="mx-auto max-w-screen-2xl h-full relative px-4 md:px-6 lg:px-8 my-4" >
            <input type="text" placeholder='Search market' className="text-[#666873]  py-3 px-4 border border-[#303241] rounded-xl w-100 h-12.5 flex items-center" />
        </div>
    </div>
  )
}

export default Header