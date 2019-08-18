import React from 'react';
// import {getColor} from '../lib/Utils';

const {Paper, Set, Circle, Rect, Text, Path} = require('react-raphael');

const Bass = ({scale, display_style}) => {

  let fretboard_length = 1070;
  let fretboard_width = 100;

  let fb_length = fretboard_length;
  let fb_width = fretboard_width;

  function hPosOffset(pos) {
    return pos - 24;
  }

  function vPosOffset(pos) {
    return pos - 10;
  }

  const fret = [30, 114, 194, 269,
    339, 406, 469, 529,
    585, 638, 688, 735,
    780, 822, 862, 899,
    935, 968, 1000, 1029, 1058].map(hPosOffset);

  const strng = [NaN, 12.5, 37.5, 62.5, 87.5].map(vPosOffset);

  function mapCoords(coords) {
    return [fret[coords[0]], strng[coords[1]]];
  }

  // See "Color Music" for more info on note colors:
  // http://mycolormusic.com/2009/07/25/the-chromatic-scale-again/

  const note_colors = {
    'C': '#ca0d3c', 'Cb': '#ca0d3c',
    'G': '#e43a23',
    'D': '#ec6f21',
    'A': '#f6ac1a',
    'E': '#ebda10',
    'B': '#97c82b',
    'Gb': '#36a938', 'F#': '#36a938',
    'Db': '#009a82', 'C#': '#009a82',
    'Ab': '#0084d4', 'G#': '#0084d4',
    'Eb': '#2f4d9e', 'D#': '#2f4d9e',
    'Bb': '#6d2a86', 'A#': '#6d2a86',
    'F': '#970a7c', 'E#': '#970a7c'
  };

  const scale_degree_color = '#2f4d9e';
  const scale_degree_root_color = '#69baea';

  const scale_degree_stroke_color = '#69baea';
  const scale_degree_root_stroke_color = '#333';

  const note_name_stroke_color = '#4b4b4b';
  const note_name_root_stroke_color = '#000';

  let notes = {};

  notes['C'] = {'coords': [[3, 3], [5, 1], [8, 4], [10, 2], [15, 3], [17, 1], [20, 4]].map(mapCoords)};
  notes['C#'] = {'coords': [[4, 3], [6, 1], [9, 4], [11, 2], [16, 3], [18, 1]].map(mapCoords)};
  notes['Db'] = notes['C#'];
  notes['D'] = {'coords': [[0, 2], [5, 3], [7, 1], [10, 4], [12, 2], [17, 3], [19, 1]].map(mapCoords)};
  notes['D#'] = {'coords': [[1, 2], [6, 3], [8, 1], [11, 4], [13, 2], [18, 3], [20, 1]].map(mapCoords)};
  notes['Eb'] = notes['D#'];
  notes['E'] = {'coords': [[0, 4], [2, 2], [7, 3], [9, 1], [12, 4], [14, 2], [19, 3]].map(mapCoords)};
  notes['Fb'] = notes['E'];
  notes['F'] = {'coords': [[1, 4], [3, 2], [8, 3], [10, 1], [13, 4], [15, 2], [20, 3]].map(mapCoords)};
  notes['F#'] = {'coords': [[2, 4], [4, 2], [9, 3], [11, 1], [14, 4], [16, 2]].map(mapCoords)};
  notes['Gb'] = notes['F#'];
  notes['G'] = {'coords': [[0, 1], [3, 4], [5, 2], [10, 3], [12, 1], [15, 4], [17, 2]].map(mapCoords)};
  notes['G#'] = {'coords': [[1, 1], [4, 4], [6, 2], [11, 3], [13, 1], [16, 4], [18, 2]].map(mapCoords)};
  notes['Ab'] = notes['G#'];
  notes['A'] = {'coords': [[0, 3], [2, 1], [5, 4], [7, 2], [12, 3], [14, 1], [17, 4], [19, 2]].map(mapCoords)};
  notes['A#'] = {'coords': [[1, 3], [3, 1], [6, 4], [8, 2], [13, 3], [15, 1], [18, 4], [20, 2]].map(mapCoords)};
  notes['Bb'] = notes['A#'];
  notes['B'] = {'coords': [[2, 3], [4, 1], [7, 4], [9, 2], [14, 3], [16, 1], [19, 4]].map(mapCoords)};
  notes['Cb'] = notes['B'];

  // let fb_length = 1070;
  // let fb_width = 100;
  const string_spacing = fb_width / 4;
  const total_frets = 20;
  const distance_above_nut = 30;
  const fret_marker_radius = 7;
  const fret_marker_color = '#000';
  const fret_marker_opacity = '1';
  // const position_color = 'green';


  const drawNote = (key_index, xpos, ypos, label, note_color, text_color, scale_degree, stroke_color) => {
    //let circle = paper.circle(xpos, ypos, 10);

    let elements = [];

    let stroke_width = 1;
    if (scale_degree === 1) {
      stroke_width = 3;
    }
    elements.push(<Rect x={xpos - 11} y={ypos - 10} width={20} height={20} r={5} attr={
      {
        'fill': note_color,
        'stroke': stroke_color,
        'stroke-width': stroke_width,
        'opacity': 1,
        'stroke-opacity': 1
      }
    }/>);

    let fontSize = '13px';
    let text_ypos = ypos - 2;
    if (label.length === 2) {
      fontSize = '10px';
      text_ypos += 1;
      text_color = '#eee';
    }
    elements.push(<Text key={key_index} x={xpos - 1} y={text_ypos + 2} text={label} attr={
      {
        'fill': text_color,
        'font-size': fontSize,
        'font-weight': 'bold'
      }
    }/>);

    return elements;
  }


  function drawNotes(note_list, display_style) {
    let elements = [];
    let scale_degree = 1;
    let key_index = 0;
    for (let note in note_list) {
      let note_name = note_list[note];
      for (let index in notes[note_name]['coords']) {
        let pos = notes[note_name]['coords'][index];
        let fret_num = pos[0] + 10;
        let string_num = pos[1] + 10;
        let note_color = note_colors[note_name];
        let note_label = note_name;
        let text_color = 'black';
        let stroke_color = note_name_stroke_color;

        if (display_style && (display_style === "degrees" || display_style === "chord")) {

          if (display_style === "chord") {
            if (scale_degree % 2 === 0) {
              continue;
            }
          }

          text_color = '#eee';
          if (scale_degree === 1) {
            note_color = scale_degree_root_color;
            stroke_color = scale_degree_root_stroke_color;
            text_color = '#000';
          } else {
            note_color = scale_degree_color;
            note_label = scale_degree;
            stroke_color = scale_degree_stroke_color;
          }
        } else {
          if (scale_degree === 1) {
            stroke_color = note_name_root_stroke_color;
          }
        }
        elements.push(drawNote(
          key_index,
          fret_num,
          string_num,
          String(note_label),
          note_color,
          text_color,
          scale_degree,
          stroke_color));
        key_index++;
      }
      scale_degree++;
    }
    return elements;
  }

  return (
    <div>
      <Paper width={fretboard_length} height={fretboard_width + 50}>
        <Set>
          {
            (() => {
            })()
          }
          {
            (() => {
              return [
                // background
                <Rect x={-10} y={0} width={fb_length + 8} height={fb_width - 1} r={10}
                      attr={{
                        stroke: '#d7b14a',
                        'stroke-width': '4',
                        gradient: '90-#e1b94e-#ffdd83'
                      }}/>,
                // background_bottom_border
                <Path d={"M 0 " + (fb_width - 1) + " l " + (fb_length - 7) + " 0"}
                      attr={{stroke: '#be8b00', 'stroke-width': '3'}}/>,
                // nut
                <Rect x={distance_above_nut} y={0} width={5} height={fb_width}
                      attr={{stroke: 'none', fill: '#444'}}/>,
                // nut_shadow
                <Path d={"M " + (distance_above_nut + 5) + " 0 l 0 " + fb_width}
                      attr={{
                        stroke: '#c5a54e',
                        'stroke-width': 2,
                        opacity: '0.5'
                      }}/>
              ];

            })()
          }
          {
            // Frets:
            (() => {
              let elements = [];
              let previous_d = 0;
              for (let fret = 0; fret < total_frets; fret += 1) {
                let fret_num = fret + 1;
                let length = 1500;
                let d = Math.round(length - (length / Math.pow(2, ((fret + 1) / 12))) + distance_above_nut);
                let p = " M " + d + " 0 l 0 " + fb_width;

                // elements.push();

                // <Circle x={} y={} r={} attr={} />
                // elements.push(
                //     <Circle x={} y={} r={} attr={} />
                // )

                if (fret_num === 3) {
                  elements.push(
                    <Circle x={previous_d + (d - previous_d) / 2} y={(fb_width / 2)}
                            r={fret_marker_radius} attr={{
                      fill: fret_marker_color,
                      stroke: 'none',
                      opacity: fret_marker_opacity
                    }}/>
                  );
                }
                ;

                if (fret_num === 5) {
                  elements.push(
                    <Circle x={previous_d + (d - previous_d) / 2} y={(fb_width / 2)}
                            r={fret_marker_radius} attr={{
                      fill: fret_marker_color,
                      stroke: 'none',
                      opacity: fret_marker_opacity
                    }}/>
                  );
                }
                ;

                if (fret_num === 7) {
                  elements.push(
                    <Circle x={previous_d + (d - previous_d) / 2} y={(fb_width / 2)}
                            r={fret_marker_radius} attr={{
                      fill: fret_marker_color,
                      stroke: 'none',
                      opacity: fret_marker_opacity
                    }}/>
                  );
                }
                ;

                if (fret_num === 9) {
                  elements.push(
                    <Circle x={previous_d + (d - previous_d) / 2} y={(fb_width / 2)}
                            r={fret_marker_radius} attr={{
                      fill: fret_marker_color,
                      stroke: 'none',
                      opacity: fret_marker_opacity
                    }}/>
                  );
                }
                ;

                if (fret_num === 12) {
                  elements.push(
                    <Circle x={previous_d + (d - previous_d) / 2} y={(fb_width / 4)}
                            r={fret_marker_radius} attr={{
                      fill: fret_marker_color,
                      stroke: 'none',
                      opacity: fret_marker_opacity
                    }}/>
                  );
                  elements.push(
                    <Circle x={previous_d + (d - previous_d) / 2} y={(fb_width - (fb_width / 4))}
                            r={fret_marker_radius} attr={{
                      fill: fret_marker_color,
                      stroke: 'none',
                      opacity: fret_marker_opacity
                    }}/>
                  );
                }
                ;
                if (fret_num === 15) {
                  elements.push(
                    <Circle x={previous_d + (d - previous_d) / 2} y={(fb_width / 2)}
                            r={fret_marker_radius} attr={{
                      fill: fret_marker_color,
                      stroke: 'none',
                      opacity: fret_marker_opacity
                    }}/>
                  );
                }
                ;
                if (fret_num === 17) {
                  elements.push(
                    <Circle x={previous_d + (d - previous_d) / 2} y={(fb_width / 2)}
                            r={fret_marker_radius} attr={{
                      fill: fret_marker_color,
                      stroke: 'none',
                      opacity: fret_marker_opacity
                    }}/>
                  );
                }
                ;
                if (fret_num === 19) {
                  elements.push(
                    <Circle x={previous_d + (d - previous_d) / 2} y={(fb_width / 2)}
                            r={fret_marker_radius} attr={{
                      fill: fret_marker_color,
                      stroke: 'none',
                      opacity: fret_marker_opacity
                    }}/>
                  );
                }
                ;


                // bass_fret
                elements.push(<Path d={p} attr={{stroke: '#444', 'stroke-width': 2}}/>);

                // bass_fret_shadow
                elements.push(<Path d={"M " + (d + 1) + " 0 l 0 " + fb_width}
                                    attr={{stroke: '#222', 'stroke-width': 1}}/>);

                // bass_fret_shadow_two
                elements.push(<Path d={"M " + (d + 2) + " 0 l 0 " + fb_width} attr={{
                  stroke: '#c5a54e',
                  'stroke-width': 2,
                  opacity: '0.5'
                }}/>);

                // fret pos debug:
                // elements.push(
                //     <Text x={d + 14} y={4} text={d} attr={{fill: position_color}}/>
                // );

                previous_d = d;
              }

              return elements;
            })()
          }
          {
            (() => {
              // Strings:
              let elements = [];
              let this_string_spacing = 12.5;
              for (let i = 0; i < 4; i += 1) {

                elements.push(<Path d={"M 0 " + this_string_spacing + " l " + fb_length + " 0"}
                                    attr={{stroke: '#888', 'stroke-width': 4}}/>);

                elements.push(<Path d={"M 0 " + (this_string_spacing - 0.5) + " l " + fb_length + " 0"}
                                    attr={{stroke: '#e2e2e2', 'stroke-width': 0.8}}/>);
                this_string_spacing += string_spacing;
              }

              return elements;
            })()
          }
          {
            (() => {
              return drawNotes(scale, display_style);
            })()
          }

        </Set>
      </Paper>
    </div>
  );
};

export default Bass;
