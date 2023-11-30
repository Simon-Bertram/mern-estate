const CreateListing = () => {
  return ( 
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Create Listing</h1>
      <form className="flex flex-col sm:flex-row gap-5">
        <div className="flex flex-col gap-4 flex-1">
          <input 
            type="text" 
            placeholder="Name" 
            className="border p-3 rounded-lg" 
            id="name" 
            maxLength="62" 
            minLength="10"
            required />
          <textarea 
            type="text" 
            placeholder="Description" 
            className="border p-3 rounded-lg" 
            id="description" 
            maxLength="62" 
            minLength="10"
            required />
          <input 
            type="text" 
            placeholder="Address" 
            className="border p-3 rounded-lg" 
            id="address" 
            maxLength="62" 
            minLength="10"
            required />

          <div className="flex flex-1 gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sale" id="sale" className="w-5" />
              <label htmlFor="sale">Sell</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="rent" id="rent" className="w-5" />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="parking" id="parking" className="w-5" />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="furnished" id="furnished" className="w-5" />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" className="w-5" />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center">
              <div className="">
                <input 
                  type="number" 
                  id="bedrooms" 
                  min='1' max='10' 
                  required 
                  className="p-3 rounded-lg border border-gray-300 mr-3" />
                <label htmlFor="bedrooms">Beds</label>
              </div>
            </div>     
            <div className="flex items-center">
              <div className="">
                <input 
                  type="number" 
                  id="baths" 
                  min='1' max='10' 
                  required 
                  className="p-3 rounded-lg border border-gray-300 mr-3" />
                <label htmlFor="baths">Baths</label>
              </div>
            </div>     
            <div className="flex items-center">
              <div className="flex items-center">
                <input 
                  type="number" 
                  id="reg-price" 
                  required 
                  className="p-3 rounded-lg border border-gray-300 mr-3" />
                <div className="flex flex-col items-center">
                <label htmlFor="reg-price">Regular Price</label>
                <span className="text-xs">(£ / month)</span>
                </div>
              </div>
            </div>     
            <div className="flex items-center">
              <div className="flex items-center">
                <input 
                  type="number" 
                  id="discounted-price"
                  required 
                  className="p-3 rounded-lg border border-gray-300 mr-3" />
                <div className="flex flex-col items-center">
                  <label htmlFor="discounted-price">
                    Discounted Price
                  </label>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            </div>     
          </div>

        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max 6)</span>
          </p>
          <div className="flex gap-4">
            <input 
              className="p-3 border border-gray-300 rounded w-full"
              type="file" 
              id="images" 
              accept="image/*" 
              multiple />
            <button className="p-3 text-green-700 border border-green-700 rounded upppcase hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80">Create Listing</button>
        </div>
      </form>
    </main>
   );
}
 
export default CreateListing;