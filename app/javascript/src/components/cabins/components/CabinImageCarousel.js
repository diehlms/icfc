import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class CabinImageCarousel extends Component {
    
    
    render() {
        const {images} = this.props;
        const imageBody = images.map((image, index) => {
            return (
                <div key={image.id}>
                    <img src={`${image.image.url}`} alt={`cabin image for cabin number ${image.cabin_id}`} />

                </div>
            )
        })

        return (
            <Carousel>
                {imageBody}
            </Carousel>
        )
    }
}

export default CabinImageCarousel;
