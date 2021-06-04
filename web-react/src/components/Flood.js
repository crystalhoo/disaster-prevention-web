import React from 'react'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps'

const CustomSkinMap = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 3.1624998356274903, lng: 101.70998952424796 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: 'water',
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: '#0088ff' },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
              { hue: '#ff0000' },
              { saturation: -100 },
              { lightness: 99 },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#808080' }, { lightness: 54 }],
          },
          {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ece2d9' }],
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{ color: '#ccdca1' }],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#767676' }],
          },
          {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#ffffff' }],
          },
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry.fill',
            stylers: [{ visibility: 'off' }, { color: '#b8cb93' }],
          },
          { featureType: 'poi.park', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'poi.sports_complex',
            stylers: [{ visibility: 'off' }],
          },
          { featureType: 'poi.medical', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'simplified' }],
          },
        ],
      }}
    >
      <Marker position={{ lat: 3.1624998356274903, lng: 101.70998952424796 }} />
      <Marker
        icon={'http://labs.google.com/ridefinder/images/mm_20_yellow.png'}
        position={{ lat: 3.2624998356275003, lng: 101.70998952424796 }}
      />
      <Marker
        icon={'http://labs.google.com/ridefinder/images/mm_20_yellow.png'}
        position={{ lat: 3.5624998356275003, lng: 101.80998952424796 }}
      />
      <Marker
        icon={'http://labs.google.com/ridefinder/images/mm_20_yellow.png'}
        position={{ lat: 3.6, lng: 101.70998952424796 }}
      />
      <Marker
        icon={'http://labs.google.com/ridefinder/images/mm_20_orange.png'}
        position={{ lat: 3.6, lng: 101.80998952424796 }}
      />
      <Marker
        icon={'http://labs.google.com/ridefinder/images/mm_20_orange.png'}
        position={{ lat: 3.6, lng: 101.85998952424796 }}
      />
    </GoogleMap>
  ))
)

export default function Maps() {
  return (
    <CustomSkinMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUfqRFAhQ1e7aMpX_bf-wXSxXBeXJ5ZX4"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}
