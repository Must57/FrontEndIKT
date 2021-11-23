import React, { useState } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

export default ({value, onChange}) => {



    return (
        <RangeSlider
            value={value}
            onChange={onChange}
            variant={"warning"}
            min={0}
            max={1000}
        />
    );

};