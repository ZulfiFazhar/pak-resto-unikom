"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import KaryawanCard from './KaryawanCard'
import DetailKaryawan from './DetailKaryawan'
import TambahUbahKaryawan from './TambahUbahKaryawan'

function page() {
    const [karyawan, setKaryawan] = useState(null)
    const [selectedKaryawan, setSelectedKaryawan] = useState(false)
    const supabase = createClientComponentClient()

    useEffect(() => {
        const fetchDataKaryawan = async () => {
            const {data, error} = await supabase
                .from("karyawan")    
                .select("*")

            if(error){
                return alert("Error fetch data : ",error)
            }else{
                setKaryawan(k => data)
            }
        }

        fetchDataKaryawan()
    }, [])

    const karyawanKoki = karyawan?.filter(kyn => kyn.jabatan == 'Koki')
    const karyawanPelayan = karyawan?.filter(kyn => kyn.jabatan == 'Pelayan')
    const karyawanKasir = karyawan?.filter(kyn => kyn.jabatan == 'Kasir')

    return (
        <div className='px-6 mt-5 h-screen'>
            <div className='flex items-center'>
                <h1 className='text-4xl'>Karyawan</h1>
                <button 
                    className='px-2 orange-custom rounded-md mt-1 ml-20'
                    onClick={() => setSelectedKaryawan(kyn => ({action:'tambah'}))}
                >+ Tambah Karyawan</button>
            </div>

            <div className='mt-3 h-5/6 flex'>
                <div className='w-2/3 h-full pr-4 overflow-auto custom-scrollbar'>
                <div className='w-full h-full pr-3 overflow-auto custom-scrollbar'>
                    <div className='flex flex-col'>
                        <h1 className='text-xl mb-1'>Pelayan</h1>
                        {karyawanPelayan?.map(kyn => (
                                <KaryawanCard 
                                    key={kyn.id}
                                    karyawan={kyn} 
                                    setSelectedKaryawan={setSelectedKaryawan} 
                                />
                            )
                        )}
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='text-xl mb-1'>Koki</h1>
                        {karyawanKoki?.map(kyn => (
                                <KaryawanCard 
                                    key={kyn.id}
                                    karyawan={kyn} 
                                    setSelectedKaryawan={setSelectedKaryawan} 
                                />
                            )
                        )}
                    </div>

                    <div className='flex flex-col'>
                        <h1 className='text-xl mb-1'>Kasir</h1>
                        {karyawanKasir?.map(kyn => (
                                <KaryawanCard 
                                    key={kyn.id}
                                    karyawan={kyn} 
                                    setSelectedKaryawan={setSelectedKaryawan} 
                                />
                            )
                        )}
                    </div>
                </div>
                </div>
                
                {selectedKaryawan &&
                    (
                        selectedKaryawan.action == "detail" 
                        ?  <DetailKaryawan />
                        :  <TambahUbahKaryawan karyawan={selectedKaryawan} />
                    )
                }

            </div>


        </div>
    )
}

export default page