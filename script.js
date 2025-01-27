var main_input;
var text_window;
var windows = []
const MAINWINDOW = 'text-window';
var currentWindow = MAINWINDOW;
var lsTabIndex = 0;

document.addEventListener('DOMContentLoaded', function(){
    main_input = document.getElementById('main-input');
    text_window = document.getElementById(MAINWINDOW);
    windows = Array.from(document.querySelectorAll('.window'));
    windows.shift();
    console.log(windows)
    main_input.addEventListener('keydown', (value)=>{onInput(value)})
    document.addEventListener('keydown', (event)=>{if(event.key=='Tab')event.preventDefault();})
    // main_input.addEventListener('keypress', (value)=>{onInput(value)})
});

function onInput(event){
    const value = main_input.value.trim();
    if (value == ''){
        return;
    }
    if (event.key === 'Tab'&&currentWindow== MAINWINDOW) {
        event.preventDefault();
        if(main_input.value.split(' ')[0]=='cd'){
            main_input.value = `cd ${windows[lsTabIndex].id}`;
            lsTabIndex++;
            if (lsTabIndex >windows.length-1){
                lsTabIndex=0;
            }
        }
    }
    if (event.key === "Enter") {
        main_input.value = '';
        text_window.innerHTML+=`<div>$root~${value}</div>`;
        if (currentWindow!= MAINWINDOW){
            console.log('not main');
            if (value.split(' ')[0]=='exit'){
                text_window.style.display = 'block';
                document.getElementById(currentWindow).style.display = 'none';
                currentWindow = MAINWINDOW;
            }
            return;
        }
        switch (value.split(' ')[0]) {
            case 'clear':
                clearTerminal();
                break;
            case 'info':
                text_window.innerHTML+=`<div>Welcome to Our Custom Linux Shell!</div>
                <div>------------------------------------</div>
                <div>This shell is designed to provide a seamless and powerful command-line experience.</div>
                <div>Built with efficiency and simplicity in mind, it supports:</div>
                <div>- Standard POSIX commands</div>
                <div>- Custom scripting</div>
                <div>- Advanced command-line utilities</div>
                <div>- Plugin and extension support</div>
                <div>Whether you're a developer, system administrator, or enthusiast,</div>
                <div>our shell is tailored to meet your needs with precision and speed.</div>
                <div>------------------------------------</div>
                <div>Get started by typing 'help' or explore our documentation for advanced features.</div>
                <div>Happy Shelling!</div>`;
                break;
            case 'help':
                    text_window.innerHTML+=`<div>Available commands!</div>
                <div>------------------------------------</div>
                <div>-ls: list available directories</div>
                <div>-cd: change directory</div>
                <div>-help: show help message</div>
                <div>-clear: clear terminal</div>`;
                    break;
            case 'ls':
                var printValue = '';
                windows.forEach((elem)=>{
                    printValue+=`<div>-${elem.id}</div>`;
                })
                text_window.innerHTML+=printValue;
                break;
            case 'cd':
                const arg = value.split(' ')[1]
                var suchDir = false;
                windows.forEach((elem)=>{
                    if (elem.id == arg){ 
                        suchDir=true;
                        document.getElementById(currentWindow).style.display = 'none';
                        elem.style.display = 'block';
                        currentWindow = elem.id
                    }
                })
                if (suchDir==false){
                    text_window.innerHTML+='<div>No such directory</div>';
                }
                break;
            default:
                text_window.innerHTML+='<div>Command not found</div>';
                break;
        }
        text_window.scrollBy(0, 500);
        return;
    }
}

function clearTerminal(){
    text_window.innerHTML='';
}