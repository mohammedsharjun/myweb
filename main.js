
function drawMouseSpeedDemo() {
    var mrefreshinterval = 30; // update display every 500ms
    var lastmousex = -1;
    var lastmousey = -1;
    var lastmousetime;
    var mousetravel = 0;
    var mpoints = [];
    var mpoints_max = 30;
    var direction;
  
    $('html').mousemove(function (e) {
      var mousex = e.pageX;
      var mousey = e.pageY;
      if (lastmousex > -1) {
        mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
      }
      // console.log(mousex-lastmousex)
  
      if (mousex - lastmousex > 0) {
        direction = '+';
      } else {
        direction = '-';
      }
  
      //console.log(direction);
  
      lastmousex = mousex;
      lastmousey = mousey;
    });
    var mdraw = function () {
      var md = new Date();
      var timenow = md.getTime();
      if (lastmousetime && lastmousetime != timenow) {
        var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
        mpoints.push(pps);
        if (mpoints.length > mpoints_max)
        mpoints.splice(0, 1);
        mousetravel = 0;
        //console.log(pps)
        if (dragging) {
          let velocity = .5 - pps / 40000;
  
  
  
          $('.slider_inner__slide').css('transform', 'rotateY(' + direction + pps / 110 + 'deg) scale(1)');
          $('.slider_inner__slide').css('transition', 'all ' + velocity + 's');
          //console.log(velocity)
        }
  
      }
      lastmousetime = timenow;
      setTimeout(mdraw, mrefreshinterval);
    };
    // We could use setInterval instead, but I prefer to do it this way
    setTimeout(mdraw, mrefreshinterval);
  };
  
  drawMouseSpeedDemo();
  
  /* -------------------------------------------------
  
  Dynamic cursor
  
  --------------------------------------------------- */
  
  const cursorSettings = {
    'class': 'dynamicCursor',
    'size': '18',
    'expandedSize': '40',
    'expandSpeed': 0.4,
    'background': 'rgba(161, 142, 218, 0.25)',
    'opacity': '1',
    'transitionTime': '1.4s',
    'transitionEase': 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
    'borderWidth': '0',
    'borderColor': 'black',
    'iconSize': '11px',
    'iconColor': 'white',
    'triggerElements': {
      'trigger': {
        'className': 'trigger',
        'icon': '<i class="fa fa-plus"></i>' },
  
      'trigger2': {
        'className': 'slider_inner',
        'icon': '<i class="fa fa-arrows-h"></i>' } } };
  
  
  
  
  
  function dynamicCursor(options) {
  
    document.write('<link rel="stylesheet" href="https://maxcdn.icons8.com/fonts/line-awesome/1.1/css/line-awesome-font-awesome.min.css">');
  
    var hold;
    cursor = document.createElement('div');
    let cursorIcon = document.createElement('div');
  
    cursorIcon.classList.add('cursorIcon');
    cursorIcon.style.position = 'absolute';
    cursorIcon.style.fontFamily = 'Raleway';
    cursorIcon.style.textTransform = 'uppercase';
    cursorIcon.style.fontWeight = '800';
    cursorIcon.style.textAlign = 'center';
    cursorIcon.style.top = '50%';
    cursorIcon.style.width = '100%';
    cursorIcon.style.transform = 'translateY(-50%)';
    cursorIcon.style.color = options.iconColor;
    cursorIcon.style.fontSize = options.iconSize;
    cursorIcon.style.opacity = 0;
    cursorIcon.style.transition = `opacity ${options.expandSpeed}s`;
  
    cursor.classList.add(options.class);
    cursor.style.boxSizing = 'border-box';
    cursor.style.width = `${options.size}px`;
    cursor.style.height = `${options.size}px`;
    cursor.style.borderRadius = `${options.expandedSize}px`;
    cursor.style.opacity = 0;
  
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = 999;
    cursor.style.transition = `transform ${options.transitionTime} ${options.transitionEase}, width ${options.expandSpeed}s .2s, height ${options.expandSpeed}s .2s, opacity 1s .2s`;
    cursor.style.border = `${options.borderWidth}px solid ${options.borderColor}`;
    cursor.style.position = 'fixed';
    cursor.style.background = options.background;
  
    cursor.appendChild(cursorIcon);
    document.body.appendChild(cursor);
  
    setTimeout(function () {
      cursor.style.opacity = options.opacity;
    }, 500);
  
    var idle;
  
    document.onmousemove = e => {
      console.log('test');
      x = e.pageX;
      y = e.pageY;
  
      cursor.style.opacity = options.opacity;
      clearInterval(idle);
  
      idle = setTimeout(function () {
        cursor.style.opacity = 0;
      }, 4000);
  
      cursor.style.top = '0';
      cursor.style.left = '0';
      cursor.style.transform = `translateX(calc(${x}px - 50%)) translateY(calc(${y}px - 50%))`;
    };
  
    for (i in options.triggerElements) {
  
      let trigger = $(`.${options.triggerElements[i].className}`);
  
      console.log(trigger);
  
  
      let icon = options.triggerElements[i].icon;
  
      if (!trigger) {
        console.warn('You dont have any triggers');
      } else {
        trigger.each(function (el) {
  
          console.log();
          trigger[el].style.cursor = 'default';
          trigger[el].addEventListener('mouseover', () => {
            console.log('over');
            cursor.style.width = `${options.expandedSize}px`;
            cursor.style.height = `${options.expandedSize}px`;
            cursorIcon.innerHTML = icon;
            cursorIcon.style.opacity = 1;
  
  
            console.log($(this));
  
  
          });
  
          trigger[el].addEventListener('mouseout', () => {
            cursor.style.width = `${options.size}px`;
            cursor.style.height = `${options.size}px`;
            cursorIcon.style.opacity = 0;
          });
        });
  
      }
    }
  }
  
  dynamicCursor(cursorSettings);
  
  $('.back').click(function () {
    $(this).parent().parent().removeClass('expand');
  });
  
  // make go back from page to slider again