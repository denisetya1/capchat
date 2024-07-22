import { getListInstagram } from "@/actions/instagram"

const Instagrams = async () => {
  const instagrams = await getListInstagram()
  
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex justify-end items-center p-3 mb-0">
        <button className="btn btn-success">Add Instagram</button>
      </div>
      
      <div className="card grow w-full shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="">
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Username</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {instagrams && instagrams.map((ig) => <tr key={ig.id} className="">
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          {ig?.profilePictureUrl && <img
                            src={ig.profilePictureUrl}
                            alt={ig.fullName || ''} />
                          }
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{ig.username}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {ig.fullName}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Instagrams