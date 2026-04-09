
const Sidebar = () => {
  return (
    <div className="flex-1 min-h-full rounded-2xl p-5 box-border border border-mist-200 shadow-sm">
        <p className="font-semibold text-lg">Filter</p>
        <div className="w-full h-0.5 mt-5 mb-5 bg-mist-200"></div>
        <div className="mt-5 mb-5">
            <p className="mb-3">Category</p>
            <div className=" border border-mist-200   box-border text-sm rounded-md p-3">
                <select className="w-full outline-none">
                    <option>Sofware Development</option>
                    <option>Design</option>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Finances</option>
                </select>
            </div>
        </div>
        <div className="mt-5 mb-5">
            <p className="mb-3">Job Type</p>
            <div className=" border border-mist-200   box-border text-sm rounded-md p-3">
              <div className="flex gap-2 mb-2">
                <input name='jobType' type='checkbox'></input>
                <label className="text-xs">Full time</label>
              </div>
               <div className="flex gap-2 mb-2">
                <input name='jobType' type='checkbox'></input>
                <label className="text-xs">Intership</label>
              </div>
               <div className="flex gap-2 ">
                <input name='jobType' type='checkbox'></input>
                <label className="text-xs">Freelance</label>
              </div>
            </div>
        </div>
        <div className="mt-5 mb-5">
            <p className="mb-3">Experience Level</p>
            <div className=" border border-mist-200   box-border text-sm rounded-md p-3">
              <div className="flex gap-2 mb-2">
                <input name='jobType' type='radio'></input>
                <label className="text-xs">Experienced</label>
              </div>
               <div className="flex gap-2 mb-2">
                <input name='jobType' type='radio'></input>
                <label className="text-xs">Intermediate</label>
              </div>
               <div className="flex gap-2 ">
                <input name='jobType' type='radio'></input>
                <label className="text-xs">Beginner</label>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar