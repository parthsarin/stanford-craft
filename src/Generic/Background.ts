import gsePano from '../img/campus/stanford-gse.jpeg';
import mainQuad from '../img/campus/main-quad.jpg';

export function getBackground() {
  if (Math.random() < .5) return gsePano;
  return mainQuad;
}