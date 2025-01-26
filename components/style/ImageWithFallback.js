import React, { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = (props) => {
    const { src, fallbackSrc,alt,lazyOff, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);
    let fallbackUrl=fallbackSrc?fallbackSrc:`/assets/images/category_default_image.png`;
    return (
        <Image
            {...rest}     
            {...(lazyOff?{}:{loading:"lazy"})}
            alt={alt}
            src={imgSrc?imgSrc:fallbackUrl}
            onError={() => {
                setImgSrc(fallbackUrl);
            }}
        />
    );
};

export default ImageWithFallback;