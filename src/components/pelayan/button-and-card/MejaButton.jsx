import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

function MejaButton({respesModal, setRespesModal, properti}) {

    const handleClick = () => {
        setRespesModal(rm => properti)
    }
    
  return (
    <div className=' flex'>

        <div className={`flex flex-col justify-start items-center w-24 h-28 rounded-md ${properti.status == 'kosong' ? 'bg-green-600' : 'bg-orange-600'} pt-3 hover:cursor-pointer`} onClick={handleClick}>
            <h3 className='text-6xl mb-1'>
                {properti.nomor_meja}
            </h3>
            <span className=' text-xs'>Status : {properti.status}</span>
            {properti.nama_pemesan != null &&
                <span className=' text-xs'>Pemesan : {properti.nama_pemesan}</span>
            }
        </div>

    </div>
  )
}

export default MejaButton