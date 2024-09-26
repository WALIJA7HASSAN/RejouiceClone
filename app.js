const locoScroll=()=>{
  gsap.registerPlugin(ScrollTrigger)

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true,
    smartphone: {
      smooth: true
    }
  })
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on('scroll', ScrollTrigger.update)

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy('#main', {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector('#main').style.transform
      ? 'transform'
      : 'fixed',
  })

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener('refresh', () => locoScroll.update())

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh()
}
locoScroll()
// end of loco cdn setup

const CursorAnim = () => {
  const heroCursor = document.querySelector('.hero-cursor')
  const hero = document.querySelector('.page1-content')

  hero.addEventListener('mousemove', (e) => {
    gsap.to(heroCursor, {
      x: e.x,
      y: e.y,
    })
  })

  hero.addEventListener('mouseenter', () => {
    gsap.to(heroCursor, {
      scale: 1,
      opacity: 1,
    })
  })
  hero.addEventListener('mouseleave', () => {
    gsap.to(heroCursor, {
      scale: 0,
      opacity: 0,
    })
  })
}

CursorAnim()

// nav anim
const navAnim=()=>{
  const navIcon = document.querySelector('nav h4')
  const closeIcon = document.querySelector('.nav-close')
  var tl = gsap.timeline()
  tl.to('.nav-menu', {
    top: '0',
    duration: 1,
  },"anim")
  tl.from(
    '.nav-menu video',
    {
      scale: 0,
    },
    'anim+=.5'
  )
  tl.from(
    '.nav-links li',
    {
     y:20,
     opacity:0,
     stagger:.1,
    },
    'anim+=.5'
  )
  tl.from(
    '.nav-menu-bottom h4',
    {
      x: 20,
      opacity: 0.1,
      stagger: 0.1,
    },
    'anim+=.75'
  )
  tl.from(
    '.nav-socials li',
    {
      x: 80,
      opacity: 0.1,
      stagger: 0.1,
    },
    'anim+=.75'
  )
  tl.pause()
  navIcon.addEventListener('click', () => {
    tl.play()
  })
  closeIcon.addEventListener('click', () => {
    tl.reverse()
  })
}
navAnim()

// rooling text anim
const menuItems = document.querySelectorAll('.nav-links li');
menuItems.forEach((item) => {
    item.addEventListener('mouseover', () => {
        const hoverElement = item.querySelector(".menu-item-active");
        const el = item.querySelector(".menu-item");
        gsap.to(hoverElement, { yPercent: -100, duration: 0.3, ease: 'sine.in',
          opacity:1,
         })
        gsap.to(el, { yPercent: -100, duration: 0.3, ease: "sine.out",
          opacity:0
         });
    });
});
menuItems.forEach((item) => {
    item.addEventListener('mouseout', () => {
        const hoverElement = item.querySelector(".menu-item-active");
        const el = item.querySelector(".menu-item");
        gsap.to(hoverElement, {
          yPercent: 100,
          duration: 0.3,
          ease: 'sine.out',
          opacity: 0,
        })
        gsap.to(el, { yPercent: 0, duration: 0.3, ease: 'sine.in', opacity: 1 })
    });
});
// rooling text anim

const page2Anim = () => {
  const page2Content = document.querySelector('.page2Content')

  const splittedContent = page2Content.textContent.split(' ')

  const newContent = splittedContent
    .map((word) => {
      return `<p><span class="page2-span">${word}</span></p>`
    })
    .join(' ')
  page2Content.innerHTML = newContent

  gsap.from('#page2 .elem p ', {
    y: 120,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: '#page2',
      scroller: '#main',//omstead of body,main jis pe  locomotive applied
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })
  gsap.from('.page2-span', {
    y: 120,
    duration: .5,
    scrollTrigger: {
      trigger: '#page2',
      scroller: '#main',
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })
  gsap.from('.page2hr', {
    width: '0%',
    scrollTrigger: {
      trigger: '#page2',
      scroller: '#main',
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })

}







// page3
 // drag to scroll
 const container = document.querySelector('.page3cards')
 let isDown = false
 let startX
 let scrollLeft
 
 // Mouse Down Event
 container.addEventListener('mousedown', (e) => {
   isDown = true
   container.classList.add('active')
   startX = e.pageX - container.offsetLeft
   scrollLeft = container.scrollLeft
 })
 
 // Mouse Leave Event
 container.addEventListener('mouseleave', () => {
   isDown = false
   container.classList.remove('active')
 })
 
 // Mouse Up Event
 container.addEventListener('mouseup', () => {
   isDown = false
   container.classList.remove('active')
 })
 
 // Mouse Move Event
 container.addEventListener('mousemove', (e) => {
   if (!isDown) return // Stop the function if not dragging
   e.preventDefault()
   const x = e.pageX - container.offsetLeft
   const walk = (x - startX) * 2 // Multiply by 2 for faster scrolling
   container.scrollLeft = scrollLeft - walk
 })
 
 // Touch Drag Event for Mobile
 container.addEventListener('touchstart', (e) => {
   isDown = true
   startX = e.touches[0].pageX - container.offsetLeft
   scrollLeft = container.scrollLeft
 })
 
 container.addEventListener('touchend', () => {
   isDown = false
 })
 
 container.addEventListener('touchmove', (e) => {
   if (!isDown) return
   const x = e.touches[0].pageX - container.offsetLeft
   const walk = (x - startX) * 2
   container.scrollLeft = scrollLeft - walk
 })
const page3Anim=()=>{
  gsap.from('.page3-top h2 span ', {
    y: 120,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: '#page3',
      scroller: '#main', //omstead of body,main jis pe  locomotive applied
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })
    
}
// page4
const page4Anim = () => {
  const page4Content = document.querySelector('.page4Content')

  const splittedContent = page4Content.textContent.split(' ')

  const newContent = splittedContent
    .map((word) => {
      return `<p><span class="page4-span">${word}</span></p>`
    })
    .join(' ')
  page4Content.innerHTML = newContent

  gsap.from('#page4 .elem p ', {
    y: 120,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: '#page4',
      scroller: '#main', //omstead of body,main jis pe  locomotive applied
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })
  gsap.from('.page4-span', {
    y: 120,
    duration: 0.5,
    scrollTrigger: {
      trigger: '#page4',
      scroller: '#main',
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })
  gsap.from('.page4hr', {
    width: '0%',
    scrollTrigger: {
      trigger: '#page4',
      scroller: '#main',
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })
}


// page5
const numberSpan = document.querySelector('.page5-spans span')
const number=()=>{
  let currentNumber = 8 // Start from 8
  const interval = setInterval(() => {
    numberSpan.textContent = currentNumber // Update the numberSpan with the current number
    currentNumber-- // Decrement the number
    if (currentNumber < 2) {
      clearInterval(interval) // Stop the interval when the number goes below 2
    }
  }, 100) // 1000ms = 1 second
}
const page5Anim = () => {
  const Cursor = document.querySelector('.page5-cursor')
  const page5 = document.querySelector('#page5')
  const seatSpan = document.querySelector(' .page5-spans')
  // const height = seatSpan.offsetHeight - 50

  page5.addEventListener('mousemove', (e) => {
    gsap.to(Cursor, {
      x: e.x,
      y: e.y,
    })
  })

  page5.addEventListener('mouseenter', () => {
    gsap.to(Cursor, {
      scale: 1,
      opacity: 1,
    })
  })
  page5.addEventListener('mouseleave', () => {
    gsap.to(Cursor, {
      scale: 0,
      opacity: 0,
    })
  })

  gsap.to(seatSpan, {
    scrollTrigger: {
      trigger: '#page5',
      onEnter:number,
      scroller: '#main',
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })
}





  
// page6
const page6Anim = () => {
  const page6Content = document.querySelector('.page6Content')

  const splittedContent = page6Content.textContent.split(' ')

  const newContent = splittedContent
    .map((word) => {
      return `<p><span class="page6-span">${word}</span></p>`
    })
    .join(' ')
  page6Content.innerHTML = newContent

  gsap.from('#page6 .elem p ', {
    y: 120,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: '#page6',
      scroller: '#main', //omstead of body,main jis pe  locomotive applied
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })
  gsap.from('.page6-span', {
    y: 120,
    duration: 0.5,
    scrollTrigger: {
      trigger: '#page6',
      scroller: '#main',
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })
  gsap.from('.page6hr', {
    width: '0%',
    scrollTrigger: {
      trigger: '#page6',
      scroller: '#main',
      start: 'top 47%',
      end: 'top 46%',
      scrub: 2,
    },
  })
}




// page7 swiper

const swiperAnim=()=>{
 var swiper = new Swiper('.mySwiper', {
   slidesPerView: 1,
   spaceBetween: 30,
   loop: true,
   autoplay: {
     delay: 2500,
     disableOnInteraction: false,
   },
   breakpoints: {
     640: {
       slidesPerView: 2,
     },
     768: {
       slidesPerView: 3,
     },
     1024: {
       slidesPerView: 4,
     },
   },
 })
}

swiperAnim()

function loaderAnim(){
var tl = gsap.timeline()
tl.from('#loader h3', {
  x: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
})

tl.to('#loader h3', {
  opacity: 0,
  duration: 1,
  x: -10,
  stagger: 0.1,
})
tl.to('#loader', {
  opacity: 0,
})
tl.from('.page1-content span', {
  opacity: 0,
  y: 100,
  stagger: 0.1,
  delay: -0.5,
})
tl.to('#loader', {
  display: 'none',
})
}
loaderAnim()
// about footer

gsap.to('.footer-top', {
  y: '-100%',
  scrollTrigger: {
    trigger: '.footer',
    scroller: '#main',
    start: 'top 100%',
    end: 'top 0%',
    scrub: 2,
  },
})

const footerAnim=()=>{

  gsap.from('.footer-top h2 span ', {
    y: 120,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: '.footer',
      scroller: '#main', //omstead of body,main jis pe  locomotive applied
      start: 'top 70%',
      end: 'top 69%',
      scrub: 2,
    },
  })
  
  gsap.from('.footer-bottom-logo h1 span', {
    opacity: 0,
    y: -50,
    stagger: 0.1,
    delay: -0.5,
    scrollTrigger: {
      trigger: '.footer',
      scroller: '#main',
      start: 'top 20%',
      end: 'top 19%',
      scrub: 4,
    },
  })
}

ScrollTrigger.matchMedia({
  
  // Tablet and larger
  "(min-width: 768px)": function() {
    // Call the function for larger screens
    page2Anim()
    page3Anim()
    page4Anim()
    page5Anim()
    page6Anim()
    footerAnim()
   
    
  }
});