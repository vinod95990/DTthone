'use strict'


// Sidebar slide in and slide out

const hamIcon=document.querySelector('.burger');
const sidebar=document.querySelector('.sidebar');
hamIcon.addEventListener('click',function(){
    if(sidebar.style.left=='0px')
    {
        sidebar.style.left='-165px';
    }
    else{
        sidebar.style.left='0px';
    }
});


// Loading assets to sidebar

const titleBox=document.querySelector('.taskname');
const titleSide=document.querySelector('.title');

const titlesSlide=document.querySelector('.assest-heading').children[0];
const taskBox=document.querySelector('.box');

// Storing data fetch from project.json
var titleName='';
var assetArray;

const getlocn=async function getlocn(){
    
    // fetching from JSON
    const response=await fetch("project.json");
    const data=await response.json();
    titleName=data.tasks[0].task_title;

    // Allocating Description
   titleBox.children[0].textContent=titleName;
   titleSide.children[0].textContent=titleName;
    
   
// Traversing assets and appending accordingly
   assetArray=data.tasks[0].assets;

    for (let i = 0; i < assetArray.length; i++) 
    {
        titlesSlide.innerHTML+=`<li>${assetArray[i].asset_title}</li>`;
        const html=document.createElement('div');
        html.setAttribute('class','box-child');

        html.innerHTML+=`<div class="box-head"> <p>${assetArray[i].asset_title}</p></div>`;
        var childHTML=document.createElement('div');
        childHTML.setAttribute('class','box-body');

        if(assetArray[i].asset_type= "display_asset")
        {
            if(!!assetArray[i]["display_asset_image"])
            {
                // debugger;
                var child=document.createElement('img');
                child.setAttribute('src',`${assetArray[i].display_asset_image}`);
               
                childHTML.append(child);
                console.log(childHTML);
            }
            else if(assetArray[i].display_asset_url)
            {
                var child=document.createElement('embed');
                child.setAttribute('src',`${assetArray[i].display_asset_url}`);
                childHTML.append(child);
                console.log(childHTML);
            }
            else if(assetArray[i].display_asset_video)
            {
                var video=document.createElement('iframe');

                video.setAttribute('width','320');
                video.setAttribute('height','240');
                video.setAttribute('src',`${assetArray[i].display_asset_video}`)
                video.setAttribute('width','400');
                video.setAttribute('height','315');
                childHTML.append(video);
                console.log(childHTML);

                /* 
                <iframe width="420" height="315"
                src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
                */

            }
            else if(assetArray[i].display_asset_docs){
                var child=document.createElement('iframe');
                child.setAttribute('src',`${assetArray[i].display_asset_docs}`);
                child.setAttribute('width','400');
                child.setAttribute('height','315');
                childHTML.append(child);
                console.log(childHTML);
            }
        }
        else
        {
            var desc=document.createElement('div');
            desc.innerHTML+=`<p>${assetArray[i].asset_description}</p>`;
            childHTML.append(desc);
        }

        html.appendChild(childHTML);
        var desc=document.createElement('div');
        desc.classList.add('box-desc')
        desc.innerHTML=`<p>${assetArray[i].asset_description}</p>`;
        html.appendChild(desc);
        taskBox.appendChild(html);
        

    }

} 


getlocn();

