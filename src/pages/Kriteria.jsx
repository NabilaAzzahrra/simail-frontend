import React, { useEffect, useRef, useState } from 'react';
import $, { error } from "jquery";
import "datatables.net-dt";
import axios from 'axios';
import "../assets/css/datatables-custom.css";
import { render } from 'react-dom';

const Kriteria = () => {
  const [name, setName] = useState('nab')
  const [criterias, setCriterias] = useState([])
  const tableRef = useRef(null);

  const getCriteria = async () => {
    await axios.get("http://localhost:3000/criterias")
      .then((response) => {
        console.log(response.data);
        setCriterias(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const criteriaSave = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/criterias", {
      name: name,
    })
      .then((response) => {
        alert(response.data.message);
        getCriteria();
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const criteriaDelete = async (id) => {

    let konfirmasi = confirm(
      'Apakah yakin akan di hapus?'
    )
    if (konfirmasi) {
      await axios.delete(`http://localhost:3000/criterias/${id}`)
        .then((response) => {
          alert(response.data.message);
          getCriteria();
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const criteriaUpdate=async(e)=>{
    await axios.put(`http://localhost:3000/criterias/${id}`, {
      name: name,
    })
      .then((response) => {
        alert(response.data.message);
        getCriteria();
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getCriteria();
  }, []);

  useEffect(() => {
    if (criterias.length > 0 && tableRef.current) {
      const existingDataTable = $(tableRef.current).DataTable();
      // existingDataTable.destroy();
      $(tableRef.current).DataTable();
    }
  }, [criterias]);


  return (
    <div className='bg-red-500 flex justify-center items-center md:h-screen'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 w-full">
        <div className='bg-emerald-500 justify-center items-center h-[500px] rounded-xl'>
          <div className="p-4 bg-red-700 rounded-tl-xl rounded-tr-xl">
            <h1 className='text-white font-bold'>Tambah Data Kriteria</h1>
          </div>
          <div className="p-4">
            <form class="space-y-6" onSubmit={criteriaSave}>
              <div>
                <label for="criteria"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kriteria <span
                    className='text-red-500'>*</span></label>
                <input type="criteria" name="criteria" id="criteria" value={name} onChange={(e) => setName(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Masukkan kriteria disini ..." required />
              </div>
              <button type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
            </form>
          </div>
        </div>
        <div className="bg-white justify-center items-center rounded-xl">
          <div className="p-4 bg-red-700 rounded-tl-xl rounded-tr-xl">
            <h1 className='text-white font-bold'>Data Kriteria</h1>
          </div>
          <div className="p-4">
            <div className="relative overflow-x-auto">
              <table ref={tableRef} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Criteria
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    criterias.map((criteria, index) =>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">
                          {criteria.name}
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => criteriaDelete(criteria.id)} className='m-4'>Hapus</button>
                          <button onClick={() => criteriaUpdate(criteria.id, criteria.criteria)} className='m-4'>Update Modal</button>
                          <button onClick={() => criteriaUpdate(criteria.id, criteria.criteria)}>Update Pindah Halaman</button>
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Kriteria
