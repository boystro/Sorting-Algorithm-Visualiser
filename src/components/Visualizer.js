import React from 'react'
import { useState, useEffect } from 'react';
import './Visualizer.scss'

export default function Visualizer() {
  const MIN = 10;
  const MAX = 400;
  
  const [FastIter, setFastIter] = useState(true)
  const [Count, setCount] = useState(50);
  const [Values, setValues] = useState([]);
  const [IsStateChanging, setIsStateChanging] = useState([]);
  const [IsSorting, setIsSorting] = useState(false);

  useEffect(() => {
    generateArray();
  }, [Count]);

  function countIncrement() {
    if (Count >= 300) {
      return;
    }
    setCount(Count => Count+10);
  }

  function countDecrement() {
    if (Count <= 10) {
      return;
    }
    setCount(Count => Count-10);
  }

  function generateArray() {
    let values = new Array(Count);
    let bools = new Array(Count);
    for (let index = 0; index < values.length; index++) {
      values[index] = Math.floor( MIN +  Math.random() * (MAX-MIN));
      bools[index] = false;
    }
    setValues(values);
    setIsStateChanging(bools);
  }

  async function BubbleSort() {
    setIsSorting(true);
    let temp = 0;
    let len = Values.length;
    let loopControl = FastIter ? 1 : 250;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len-i-1; j++) {
        IsStateChanging[j] = true;
        IsStateChanging[j+1] = true;
        setIsStateChanging([...IsStateChanging]);
        if (Values[j] > Values[j+1]) {
          temp = Values[j+1];
          Values[j+1] = Values[j];
          Values[j] = temp;
          setValues([...Values]);
          await sleep(loopControl);
        }
        IsStateChanging[j] = false;
        IsStateChanging[j+1] = false;
        setIsStateChanging([...IsStateChanging]);
      }
    }
    setIsSorting(false);
  }

  async function SelectionSort() {
    setIsSorting(true);
    let temp = 0;
    let len = Values.length;
    let loopControl = FastIter ? 1 : 250;
    for (let i = 0; i < len; i++) {
      for (let j = i; j < len; j++) {
        IsStateChanging[i] = true;
        IsStateChanging[j] = true;
        setIsStateChanging([...IsStateChanging]);
        if (Values[i] > Values[j]) {
          temp = Values[j];
          Values[j] = Values[i];
          Values[i] = temp;
          setValues([...Values]);
          
        }
        await sleep(loopControl);
        IsStateChanging[i] = false;
        IsStateChanging[j] = false;
        setIsStateChanging([...IsStateChanging]);
      }
    }
    setIsSorting(false);
  }

  async function InsertionSort() {
    setIsSorting(true);
    let temp = 0;
    let len = Values.length;
    let loopControl = FastIter ? 1 : 250;
    
    for (let i = 1; i < len; i++) {
      temp = Values[i];
      var j = i-1;
      while ((j>-1) && (Values[j] > temp)) {
        IsStateChanging[j] = true;
        IsStateChanging[j+1] = true;
        setIsStateChanging([...IsStateChanging]);

        Values[j+1] = Values[j];
        
        setValues([...Values]);

        await sleep(loopControl);
        IsStateChanging[j] = false;
        IsStateChanging[j+1] = false;
        setIsStateChanging([...IsStateChanging]);
        j--;
      }
      Values[j+1] = temp;
      setValues([...Values]);
    }
    setIsSorting(false);
  }

  async function QuickSort() {
       
  }

  async function MergeSort() {

  }

  async function CountingSort() {

  }

  async function BucketSort() {

  }

  async function HeapSort() {

  }

  async function RadixSort() {

  }

  return (
    <div className='visualizer'>
        <div className='wrapper'>
          {Values.map((value, idx) => {
              return (
                <div className={IsStateChanging[idx] ? 'number-repr-bar active' : 'number-repr-bar'} key={idx} style={{height : value}}></div>
              );
            })}
        </div>
        <span className={IsSorting?'ar-ct':'ar-ct deactivated'}>{Count} Elements</span>
        <div className={IsSorting?'controls deactivated':'controls'}>
            
            <div className='algorithm-selector'>

              <button className='selector-list' onClick={() => BubbleSort()} disabled={IsSorting}>Bubble Sort</button>
              <button className='selector-list' onClick={() => SelectionSort()} disabled={IsSorting}>Selection Sort</button>
              <button className='selector-list' onClick={() => InsertionSort()} disabled={IsSorting}>Insertion Sort</button>
              <button className='selector-list' onClick={() => QuickSort()} disabled={IsSorting}>Quick Sort</button>
              <button className='selector-list' onClick={() => MergeSort()} disabled={IsSorting}>Merge Sort</button>
              <button className='selector-list' onClick={() => CountingSort()} disabled={IsSorting}>Counting Sort</button>
              <button className='selector-list' onClick={() => BucketSort()} disabled={IsSorting}>Bucket Sort</button>
              <button className='selector-list' onClick={() => HeapSort()} disabled={IsSorting}>Heap Sort</button>
              <button className='selector-list' onClick={() => RadixSort()} disabled={IsSorting}>Radix Sort</button>

            </div>
            <button className='iteration-speed' onClick={() => setFastIter(FastIter?false:true)} disabled={IsSorting}>{FastIter ? "Fast" : "Slow"}</button>
            <div className='array-counter'>
              <button className='incr' onClick={() => {countIncrement()}} disabled={IsSorting}>&#9650;</button>
              <span className='array-count-val'>{Count}</span>
              <button className='decr' onClick={() => {countDecrement()}} disabled={IsSorting}>&#9660;</button>
            </div>
            <button className='reset' onClick={() => generateArray()} disabled={IsSorting}>Reset</button>
        </div>
    </div>
  )
}

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
}