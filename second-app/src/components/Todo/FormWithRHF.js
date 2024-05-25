import { useForm } from 'react-hook-form'
const FormWithRHF = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <label>Имя:</label>
            <input {...register('name', { required: 'Обязательное поле' })} />
            <p>{errors.name?.message}</p>
            <button type='submit'>Отправить</button>
        </form>
    )
}

export default FormWithRHF;