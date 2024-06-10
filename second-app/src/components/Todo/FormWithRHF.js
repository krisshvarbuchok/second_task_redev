import { useForm } from 'react-hook-form'
import { useState } from 'react';
import Modal from './Modal';

const FormWithRHF = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});

    function isAdult(value) {
        const birthday = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthday.getFullYear();
        const month = today.getMonth() - birthday.getMonth();
        const day = today.getDate() - birthday.getDate();

        if (age > 18 || (month >= 0 && age >= 18 && day >= 0)) return age;
        else return false;
    }
    const onSubmit = data => {
        console.log(data)
        setFormData(data);
        setIsModalOpen(true);
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Имя:</label>
            <input {...register('name', {
                required: 'Обязательное поле',
                pattern: {
                    value: /^[А-Яа-яЁёA-Za-z0-9]+$/,
                    message: 'неверное имя',
                }
            })} />
            <p>{errors.name?.message}</p>
            <label>E-mail</label>
            <input {...register('Email', {
                required: 'Обязательное поле',
                pattern: {
                    value: /^[A-Za-z0-9-_.%+&]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: 'Введите валидный email',
                }
            })} />
            <p>{errors.Email?.message}</p>
            <label>Пароль</label>
            <input {...register('password', {
                required: 'Обязательное поле',
                minLength: {
                    value: 6,
                    message: 'слишком короткий, нужно минимум 6 символов'
                },
                pattern: {
                    value: /^(?=.*[A-ZА-ЯЁ]).*[A-Za-zА-Яа-яЁё0-9]+$/,
                    message: 'Введите валидный пароль',
                }
            })} />

            <p>{errors.password?.message}</p>
            <label>Повторите пароль</label>
            <input {...register('repeatPassword', {
                required: 'Обязательное поле',
                validate: value =>
                    value === password || 'Пароли не совпадают'
            })} />
            <p>{errors.repeatPassword?.message}</p>
            <label>Дата рождения</label>
            <input {...register('birthdate', {
                required: 'Обязательное поле',
                validate: {
                    isAdult: value => isAdult(value) || 'Вам должно быть не менее 18 лет'
                }
            })} type="date" />
            <p>{errors.birthdate?.message}</p>
            <label>Ваш пол</label>
            <div>
                <label>
                    <input
                        type='radio'
                        {...register('gender', {
                            required: 'выберите пол',
                        })}
                        value='female' />
                    Женский
                </label>
                <label>
                    <input
                        type='radio'
                        {...register('gender', {
                            required: 'выберите пол',
                        })}
                        value='male' />
                    Мужской
                </label>
            </div>
            <label>Номер телефона</label>
            <input {...register('tel', {
                required: 'Обязательное поле',
                pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Введите правильно номер'
                }
            })}/>
            <button type='submit'>Зарегистрироваться</button>
        </form>
        {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div>Успешно зарегистрировано</div>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </Modal>
      )}
      </>
    )
}

export default FormWithRHF;