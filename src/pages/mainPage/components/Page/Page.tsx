import { useNavigate } from 'react-router-dom';
import { Button, Card, Spin, Text } from '@gravity-ui/uikit';
import { Carousel } from '@/shared/components/Carousel/Carousel';
import { useGetBookPageQuery } from '@/shared/api/book/api';
import { BookList } from '@/entities/book';

import libraryImage from '@/shared/assets/images/library.jpeg';
import manReading from '@/shared/assets/images/manReading.jpeg';
import libraryMan from '@/shared/assets/images/libraryMan.jpeg';

import block from 'bem-cn-lite';
import './Page.scss';
const b = block('mainPage');

export const Page = () => {
	const navigate = useNavigate();
	const { data, isLoading } = useGetBookPageQuery({ page: 0 });

    return (
		<div className={b()}>
			<Text className={b('header')} variant='display-4'>
				ТАМ ГДЕ КНИГА ВСТРЕЧАЕТСЯ С ЧИТАТЕЛЕМ
			</Text>
			<div className={b('block')}>
				<img src={libraryImage} alt='Здание библиотеки' className={b('image', { horizontal: true })}/>
				<Text variant='body-3'>
					Добро пожаловать на сайт библиотеки "Точка с запятой" — место, где каждая книга становится историей, а каждая история находит своего читателя. 
					Здесь стиль и мода встречаются с вечной классикой, создавая пространство, в котором удобно и уютно проводить время.
					<br/><br/>
					"Точка с запятой" — это больше, чем библиотека. Это бренд, пропитанный любовью к книгам и заботой о каждом посетителе. Мы ценим ваше время и стремимся сделать каждый визит к нам незабываемым, предлагая вам самые яркие эмоции и лучшие моменты в мире литературы.
					<br/><br/>
					Ваше место для вдохновения и чтения — библиотека "Точка с запятой".
				</Text>
			</div>

			{ isLoading 
			  ? <Spin className='loader'/> 
			  : <Carousel itemCount={20}>
					<BookList className={b('bookList')} books={data?.books ?? []} onBookClick={(id) => navigate(`book/${id}`)}/>
				</Carousel>
			}

			<Text className={b('header')} variant='display-4'>
				ЧИТАЙТЕ ВМЕСТЕ С НАМИ
			</Text>

			<div className={b('cardBlock')}>
				<img src={libraryMan} alt='Библиотекарь' className={b('image', { vertical: true })}/>
				<Card className={b('card')} view='filled' size='l'>
					<Text variant='display-1'>Вы можете забронировать книгу для чтения дома</Text>
					<Text variant='body-2'>Забронируйте понравившуюся книгу, заберите её в течение 3-ёх дне и наслаждайтесь чтением в домашней обстановке</Text>
					<Button view='action' size='xl'>К книгам</Button>
				</Card>
			</div>

			<div className={b('block')}>
				<Text variant='body-3'>
					Добро пожаловать на сайт библиотеки "Точка с запятой" — место, где каждая книга становится историей, а каждая история находит своего читателя. 
					Здесь стиль и мода встречаются с вечной классикой, создавая пространство, в котором удобно и уютно проводить время. У нас всегда найдется время для чашечки ароматного кофе и беседы о последних литературных новинках.
					<br/><br/>
					"Точка с запятой" — это больше, чем библиотека. Это бренд, пропитанный любовью к книгам и заботой о каждом посетителе. Мы ценим ваше время и стремимся сделать каждый визит к нам незабываемым, предлагая вам самые яркие эмоции и лучшие моменты в мире литературы.
					Ощутите нашу страсть к книгам, окунитесь в мир, где креативность не знает границ, а забота о читателях стоит на первом месте. 
					<br/><br/>
					Ваше место для вдохновения и чтения — библиотека "Точка с запятой".
				</Text>
				<img src={manReading} alt='Мужчина читает' className={b('image', { horizontal: true })}/>
			</div>

		</div>
    );
};

export default Page;