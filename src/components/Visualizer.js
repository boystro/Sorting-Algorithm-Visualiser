import React from 'react'
import { useState, useEffect } from 'react';
import './Visualizer.scss'

export default function Visualizer() {
  const MIN = 10;
  const MAX = 400;
  
  const [SortMethod, setSortMethod] = useState("");
  const [FastIter, setFastIter] = useState(true);
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
    setSortMethod("Bubble Sort");
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
    setSortMethod("Selection Sort");
    setIsSorting(true);
    let temp = 0;
    let len = Values.length;
    let loopControl = FastIter ? 1 : 250;
    for (let i = 0; i < len; i++) {
      for (let j = i; j < len; j++) {
        if (Values[i] > Values[j]) {
          IsStateChanging[i] = true;
          IsStateChanging[j] = true;
          setIsStateChanging([...IsStateChanging]);
          temp = Values[j];
          Values[j] = Values[i];
          Values[i] = temp;
          setValues([...Values]);
          await sleep(loopControl);
          IsStateChanging[i] = false;
          IsStateChanging[j] = false;
          setIsStateChanging([...IsStateChanging]);
        }
          
      }
    }
    setIsSorting(false);
  }

  async function InsertionSort() {
    setSortMethod("Insertion Sort");
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
    setSortMethod("Quick Sort");
    setIsSorting(true);
    let loopControl = FastIter ? 1 : 250;
    async function swap(i, j) {
      IsStateChanging[i] = true;
      IsStateChanging[j] = true;
      setIsStateChanging([...IsStateChanging]);

      let temp = Values[i];
      Values[i] = Values[j];
      Values[j] = temp;
      setValues([...Values]);
      
      await sleep(loopControl);
      IsStateChanging[i] = false;
      IsStateChanging[j] = false;
      setIsStateChanging([...IsStateChanging]);
    }
    async function partition(low, high) {
      let pivot = Values[high];
      let i = (low - 1);
      for (let j = low; j <= high - 1; j++) {
        if (Values[j] < pivot) {
          i++;
          await swap(i, j);
        }
      }
      swap(i + 1, high);
      return (i + 1);
    }
    async function quickSort(low, high) {
      if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
      }
    }
    await quickSort(0, Values.length-1)
    setIsSorting(false);
  }

  async function MergeSort() {
    setSortMethod("Merge Sort");
    setIsSorting(true);
    let loopControl = FastIter ? 1 : 250;

    async function merge(l, m, r) {
        var n1 = m - l + 1;
        var n2 = r - m;
      
        var L = new Array(n1); 
        var R = new Array(n2);
      
        IsStateChanging[l] = true;
        IsStateChanging[m] = true;
        setIsStateChanging([...IsStateChanging]);

        for (var i = 0; i < n1; i++) {
          L[i] = Values[l + i];
        }
            
        for (var j = 0; j < n2; j++) {
          R[j] = Values[m + 1 + j];
        }
            
        IsStateChanging[l] = false;
        IsStateChanging[m] = false;
        setIsStateChanging([...IsStateChanging]);

        var i = 0;
        var j = 0;
        var k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                IsStateChanging[k] = true;
                setIsStateChanging([...IsStateChanging]);

                Values[k] = L[i];
                setValues([...Values]);

                await sleep(loopControl);
                IsStateChanging[k] = false;
                setIsStateChanging([...IsStateChanging]);
                i++;
            }
            else {
                IsStateChanging[k] = true;
                setIsStateChanging([...IsStateChanging]);

                Values[k] = R[j];
                setValues([...Values]);

                await sleep(loopControl);
                IsStateChanging[k] = false;
                setIsStateChanging([...IsStateChanging]);
                j++;
            }
            k++;
        }
        while (i < n1) {
            IsStateChanging[k] = true;
            setIsStateChanging([...IsStateChanging]);

            Values[k] = L[i];
            
            await sleep(loopControl);
            IsStateChanging[k] = false;
            setIsStateChanging([...IsStateChanging]);

            i++;
            k++;
        }
        while (j < n2) {
          IsStateChanging[k] = true;
          setIsStateChanging([...IsStateChanging]);

          Values[k] = R[j];
          setValues([...Values]);

          await sleep(loopControl);
          IsStateChanging[k] = false;
          setIsStateChanging([...IsStateChanging]);
          j++;
          k++;
        }
    }
    async function mergeSort(l, r){
        if(l>=r){
            return;
        }
        var m = l + parseInt(( r - l ) / 2);
        await mergeSort(l,m);
        await mergeSort(m+1,r);
        await merge(l,m,r);
    }
    await mergeSort(0, Values.length-1);
    setIsSorting(false);
  }

  async function CountingSort() {
    setSortMethod("Counting Sort");
    setIsSorting(true);
    let loopControl = FastIter ? 1 : 250;
    async function countSort()
    {
      var max = Math.max.apply(Math, Values);
      var min = Math.min.apply(Math, Values);
      var range = max - min + 1;
      var count = Array.from({length: range}, (_, i) => 0);
      var output = Array.from({length: Values.length}, (_, i) => 0);
      for (let i = 0; i < Values.length; i++) {
          IsStateChanging[i] = true;
          setIsStateChanging([...IsStateChanging]);
          
          count[Values[i] - min]++;
          
          await sleep(loopControl);
          IsStateChanging[i] = false;
          setIsStateChanging([...IsStateChanging]);
      }
      for (let i = 1; i < count.length; i++) {
          count[i] += count[i - 1];
      }
      for (let i = Values.length - 1; i >= 0; i--) {
          IsStateChanging[i] = true;
          setIsStateChanging([...IsStateChanging]);

          output[count[Values[i] - min] - 1] = Values[i];
          count[Values[i] - min]--;

          await sleep(loopControl);
          IsStateChanging[i] = false;
          setIsStateChanging([...IsStateChanging]);
      }
      for (let i = 0; i < Values.length; i++) {
          IsStateChanging[i] = true;
          setIsStateChanging([...IsStateChanging]);

          Values[i] = output[i];
          setValues([...Values]);

          await sleep(loopControl);
          IsStateChanging[i] = false;
          setIsStateChanging([...IsStateChanging]);
      }
    }
    await countSort();
    setIsSorting(false);
  }

  async function DoubleSelectionSort() {
    setSortMethod("Double Selection Sort");
    setIsSorting(true);
    let len = Values.length;
    let loopControl = FastIter ? 1 : 250;
    let hasChanged = false;
    let temp, minIter, maxIter;
    for (let i = 0; i < Math.floor(len/3); i++) {
      temp=0;
      minIter=i;
      maxIter=Values.length - i - 2;
      while (minIter < len-i) {

        hasChanged = false;
        if (Values[maxIter] > Values[maxIter+1]) {
          hasChanged = true;
          IsStateChanging[maxIter] = true;
          IsStateChanging[maxIter+1] = true;
          setIsStateChanging([...IsStateChanging]);

          temp = Values[maxIter];
          Values[maxIter] = Values[maxIter + 1];
          Values[maxIter + 1] = temp;
        }

        if (Values[minIter-1] > Values[minIter]) {
          hasChanged = true;
          IsStateChanging[minIter] = true;
          IsStateChanging[minIter+1] = true;
          setIsStateChanging([...IsStateChanging]);

          temp = Values[minIter];
          Values[minIter] = Values[minIter - 1];
          Values[minIter - 1] = temp;
        }
        if (hasChanged) {
          await sleep(loopControl);
          IsStateChanging[maxIter] = false;
          IsStateChanging[maxIter+1] = false;
          IsStateChanging[minIter] = false;
          IsStateChanging[minIter+1] = false;
          setIsStateChanging([...IsStateChanging]);
        }

        minIter++;
        maxIter--;
      }      

    }
    setValues([...Values]);
    setIsSorting(false);
  }
  
  async function HeapSort() {
    setSortMethod("Heap Sort");
    setIsSorting(true);
    var array_length;
    let loopControl = FastIter ? 1 : 250;
    async function heap_root(i) {
      var left = 2 * i + 1;
      var right = 2 * i + 2;
      var max = i;
      if (left < array_length && Values[left] > Values[max]) max = left;
      if (right < array_length && Values[right] > Values[max]) max = right;
      if (max != i) {
        await swap(i, max);
        await heap_root(max);
      }
    }
    async function swap(index_A, index_B) {
      IsStateChanging[index_A] = true;
      IsStateChanging[index_B] = true;
      setIsStateChanging([...IsStateChanging]);

      var temp = Values[index_A];
      Values[index_A] = Values[index_B];
      Values[index_B] = temp;
      setValues([...Values]);

      await sleep(loopControl);
      IsStateChanging[index_A] = false;
      IsStateChanging[index_B] = false;
      setIsStateChanging([...IsStateChanging]);
    }
    async function heapSort() {
      array_length = Values.length;
      for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
        await heap_root(i);
      }
      for (i = Values.length - 1; i > 0; i--) {
        await swap(0, i);
        array_length--;
        await heap_root(0);   
      }
    }
    await heapSort(Values);
    setIsSorting(false);
  }

  async function RadixSort() {
    setSortMethod("Radix Sort");
    setIsSorting(true);
    let loopControl = FastIter ? 1 : 250;
    function getMax()
    {
        let mx = Values[0];
        for (let i = 1; i < Values.length; i++) {
          if (Values[i] > mx) {
            mx = Values[i];
          }
        }
        return mx;
    }

    async function countSort(exp)
    {
        let n = Values.length;
        let output = new Array(n);
        let i;
        let count = new Array(10);
        for(let i=0;i<10;i++)
            count[i]=0;
        for (i = 0; i < n; i++)
            count[Math.floor(Values[i] / exp) % 10]++;
  
        for (i = 1; i < 10; i++)
            count[i] += count[i - 1];
  
        for (i = n - 1; i >= 0; i--) {
            output[count[Math.floor(Values[i] / exp) % 10] - 1] = Values[i];
            count[Math.floor(Values[i] / exp) % 10]--;
        }
  
        for (i = 0; i < n; i++) {
          IsStateChanging[i] = true;
          setIsStateChanging([...IsStateChanging]);
          Values[i] = output[i];
          setValues([...Values]);
          await sleep(loopControl);
          IsStateChanging[i] = false;
          setIsStateChanging([...IsStateChanging]);
        }
    }
    
    async function radixsort()
    {
      let m = getMax();
      for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
        await countSort(exp);
      }
    }

    await radixsort();
    setIsSorting(false);
  }

  return (
    <div className='visualizer'>
        <div className='wrapper'>
          <div className='on-mobile-note'>Please Use a Widescren Desktop to load everything properly.</div>
          {Values.map((value, idx) => {
              return (
                <div className={IsStateChanging[idx] ? 'number-repr-bar active' : 'number-repr-bar'} key={idx} style={{height : value}}></div>
              );
            })}
        </div>
        <span className={IsSorting?'ar-ct':'ar-ct deactivated'}>{SortMethod}ing {Count} Elements</span>
        <div className={IsSorting?'controls deactivated':'controls'}>
            
            <div className='algorithm-selector'>

              <button className='selector-list' onClick={() => BubbleSort()} disabled={IsSorting}>Bubble Sort</button>
              <button className='selector-list' onClick={() => SelectionSort()} disabled={IsSorting}>Selection Sort</button>
              <button className='selector-list' onClick={() => DoubleSelectionSort()} disabled={IsSorting}>Double Selection Sort</button>
              <button className='selector-list' onClick={() => InsertionSort()} disabled={IsSorting}>Insertion Sort</button>
              <button className='selector-list' onClick={() => QuickSort()} disabled={IsSorting}>Quick Sort</button>
              <button className='selector-list' onClick={() => MergeSort()} disabled={IsSorting}>Merge Sort</button>
              <button className='selector-list' onClick={() => CountingSort()} disabled={IsSorting}>Counting Sort</button>
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
