# Getting started with reducing the size file upload component #

## Description ##
This is a React upload component that also reduces the image file size if necessary. the parameters of the element are:
1. onSelectFile - select file handler
2. maxWidth: maximum width of the reduced file image. It is measured in pixels. if the uploaded image width is smaller than the maximum file width then there won't be any file reduction.
3. max-height: Optional. do the same thing but for height.

## Install the Component ##
In order to install this component simply execute the following command:
```
npm i uploadfilereducedsize
```

Here is how you implement the component in your react code

```
import './App.css';
import FramedVideo from 'videoframebyframe/FramedVideo';

function App() {
  return (
    <div className="App">
      <div className="videoContainer"><FramedVideo src="blender.mp4"></FramedVideo></div>
    </div>
  );
}

export default App;
```


This component was made by Kobi Krasnoff
