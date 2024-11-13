import { FC, useEffect, useRef } from 'react'
import { useModalStore } from '../../../infrastructure/stores/ModalStore';


const ModalDetails: FC = () => {

  const { modalData, closeModal } = useModalStore();

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (modalData && dialogRef.current) {
      dialogRef.current.showModal(); // Abre el modal cuando hay datos
    }
  }, [modalData]);

  if (!modalData) return null; // Si no hay contenido, no renderiza nada

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close(); // Cierra el modal manualmente
    }
    closeModal();
  };


  return (
    <>
      <dialog ref={dialogRef} id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-xl my-4 sm:text-3xl">{ modalData.data.title}</h3>
          <figure>
            <img
              className="rounded-t-lg w-full h-48 object-contain"
              src={ modalData.data.image }
              alt={ modalData.data.title } 
              loading="lazy"
            />
          </figure>
          <p className="py-4">{ modalData.data.subTitle }</p>
          <div className="modal-action">
            <button className="btn" onClick={handleClose}>Close</button>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default ModalDetails