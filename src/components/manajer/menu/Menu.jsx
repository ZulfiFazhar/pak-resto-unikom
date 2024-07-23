"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState, useEffect } from 'react'
import TambahMenu from './TambahMenu'
import DetailMenu from './DetailMenu'

function selectedMenu() {
  const [menu, setMenu] = useState()
  const [cariMenu, setCariMenu] = useState("")
  // Detam = detail atau tambah
  const [bukaDetam, setBukaDetam] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState()
  const supabase = createClientComponentClient()

  // Fetch data menu saat pertama kali load
  useEffect(() => {
    const fetchMenu = async () => {
      const {data, error} = await supabase
        .from('menu')
        .select('*')

      if(error){
        return alert('Error fetch data : ',error)
      }else{
        setMenu(m => data)
      }
    }

    fetchMenu()
  }, [])

  // Subcribe realtime ke menu
  useEffect(() => {
    const subscribeToMenu = supabase
    .channel('menu-subscribe')
    .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'menu'
    }, (payload) => {
        if(payload.eventType == "INSERT"){
          setMenu(m => [...m, payload.new])
        }
    })
    .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscribeToMenu.unsubscribe();
    };
  }, [supabase]);

  const handleClickMenuCard = (menu) => {
    setSelectedMenu(sm => menu)
    setBukaDetam(bd => 'detail')
  }

  const filteredMenu = menu?.filter(mn => {
    return mn.nama_masakan.toLowerCase().includes(cariMenu.toLowerCase())
  })

  return (
    <div className='min-h-screen flex'>
      <div className='w-2/3 p-5'>
        <div className='flex justify-between items-center'>
          <h1 className='text-4xl'>Menu</h1>
          
          <div className='flex items-stretch ml-6'>
            <input 
              className='bg-slate-200 rounded-md px-2 text-sm p-1' 
              placeholder='Search' 
              autoComplete='off'
              value={cariMenu}
              onChange={() => setCariMenu(event.target.value)} />  

              <button className={`ml-1 rounded-xl bg-red-500 text-white px-2 hover:bg-red-600 ${cariMenu == "" && 'bg-white hover:bg-white'}`}
                onClick={() => setCariMenu(cm => "")}>
                x
              </button>
          </div>

          <button className='orange-custom rounded-md text-white text-sm px-2 py-1' onClick={() => setBukaDetam(bd => "tambah")}>+ Tambah Menu</button>
        </div>

        <div className='mt-5 flex flex-wrap justify-start *:mr-2 *:mb-2'>
          {filteredMenu?.map(mn => {
            return (
              <div key={mn.id} className='bg-slate-200 rounded-md p-2 w-32' >
                <h1 className='text-md'>{mn.nama_masakan}</h1>
                <p className='text-[0.5rem]'>{mn.deskripsi}</p>
                <div className='flex justify-between mt-1'>
                  <p className='text-xs'><span className='text-orange-custom'>Rp. </span> {mn.harga}</p>
                  <button className='px-2 text-xs orange-custom text-white rounded-full' onClick={() => handleClickMenuCard(mn)}>detail</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {
        bukaDetam == "none" && 
        <div className='w-1/3'></div> 
      }
      {
        bukaDetam == "tambah" && 
        <TambahMenu supabase={supabase} setBukaDetam={setBukaDetam} />
      }
      {
        bukaDetam == "detail" && 
        <DetailMenu selectedMenu={selectedMenu} setBukaDetam={setBukaDetam}  /> 
      }
        
    </div>
  )
}

export default selectedMenu