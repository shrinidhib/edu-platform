import Carousel from 'react-bootstrap/Carousel';

function Carousell() {
  return (
    <Carousel>
      <Carousel.Item interval={1500}>
        <img src='https://images.pexels.com/photos/5598296/pexels-photo-5598296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className="d-block w-100" height={300}/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
      <img src='https://images.pexels.com/photos/5598296/pexels-photo-5598296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className="d-block w-100" height={300}/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
      <img src='https://images.pexels.com/photos/5598296/pexels-photo-5598296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className="d-block w-100" height={300}/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousell;
