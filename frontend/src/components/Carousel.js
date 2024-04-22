import Carousel from 'react-bootstrap/Carousel';
import car1 from '../images/car1.jpg'
import car2 from '../images/car2.jpg'
import car3 from '../images/car3.jpg'


function Carousell() {
  return (
    <Carousel>
      <Carousel.Item interval={1500}>
        <img alt='carousel' src={car1} className="d-block w-100" height={400}/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
      <img alt='carousel' src={car2} className="d-block w-100" height={400}/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
      <img  alt='carousel' src={car3} className="d-block w-100" height={400}/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousell;
