import { PipeOrdenarTracksPipe } from './pipe-ordenar-tracks.pipe';

import * as dataRow from '../../data/tracks.json';

describe('PipeOrdenarTracksPipe', () => {
  it('create an instance', () => {
    const pipe = new PipeOrdenarTracksPipe();
    expect(pipe).toBeTruthy();
  });

  it('should validate input and output', () => {
    
    //Arrange
    const pipe = new PipeOrdenarTracksPipe();
    const {data}: any = (dataRow as any).default;

    //
    const orderedList = pipe.transform(data,5,true);

    //ASSERT

    expect(orderedList).toEqual(data);

  });

  it('should order list by name ascending', () => {
    
    //Arrange
    const pipe = new PipeOrdenarTracksPipe();
    const {data}: any = (dataRow as any).default;
    const firtValue = data.find((item:any)=> item._id ===7);
    const lastValue = data.find((item:any)=> item._id ===6);
    //
    const orderedList = pipe.transform(data,1,true);

    //ASSERT

    expect(orderedList[0].name).toEqual(firtValue.name);
    expect(orderedList[orderedList.length-1].name).toEqual(lastValue.name);

  });
  it('should order list by name descending', () => {
    
    //Arrange
    const pipe = new PipeOrdenarTracksPipe();
    const {data}: any = (dataRow as any).default;
    const firtValue = data.find((item:any)=> item._id ===7);
    const lastValue = data.find((item:any)=> item._id ===6);
    //
    const orderedList = pipe.transform(data,1,false);

    //ASSERT

    expect(orderedList[0].name).toEqual(lastValue.name);
    expect(orderedList[orderedList.length-1].name).toEqual(firtValue.name);

  });

  it('should order list by album ascending', () => {
    
    //Arrange
    const pipe = new PipeOrdenarTracksPipe();
    const {data}: any = (dataRow as any).default;
    const firtValue = data.find((item:any)=> item._id ===7);
    const lastValue = data.find((item:any)=> item._id ===8);
    //
    const orderedList = pipe.transform(data,2,true);

    //ASSERT

    expect(orderedList[0].album).toEqual(firtValue.album);
    expect(orderedList[orderedList.length-1].album).toEqual(lastValue.album);

  });
  it('should order list by album descending', () => {
    
    //Arrange
    const pipe = new PipeOrdenarTracksPipe();
    const {data}: any = (dataRow as any).default;
    const firtValue = data.find((item:any)=> item._id ===7);
    const lastValue = data.find((item:any)=> item._id ===8);
    //
    const orderedList = pipe.transform(data,2,false);

    //ASSERT

    expect(orderedList[0].album).toEqual(lastValue.album);
    expect(orderedList[orderedList.length-1].album).toEqual(firtValue.album);

  });
  
});
