const constants  = {
  name : 'Stuthi Balaji',
  title : 'Web Software Engineer',
  description: [
    'I am a New York based Software Engineer specializing in interactive web applications. ',
    'I graduated from ',
    'University of California Irvine',
    ', and since then have worked as an application developer. I believe in using modern technologies and frameworks to build high quality products.',
  ],
  technologies: ['JavaScript (ES6)', 'React', 'Lodash', 'HTML/CSS', 'Node.js', 'Express'],
  experince: {
    Balbix: {
      name: 'Balbix Inc.',
      location: 'San Jose, CA',
      time: 'Nov 2017 - Nov 2018',
      title: 'Software Engineer',
      website: 'https://www.balbix.com/',
      projects: [
        'Responsible for architecting and developing the following user intensive application dashboards using ReactJS, Material UI, Victory Chart, Lodash, Javascript.',
        'User Preferences Dashboard​ to manage user profile information, notification and subscription preferences.',
        'Insights Dashboard​ with navigation tabs to represent system generated insights for a high level display using line charts with custom popups and a detailed view via expanding tables.',
        'Mitigation Dashboard​ that allowed users to apply or override application generated mitigations. The mitigation results is displayed on custom flip-cards and is filterable and sortable.',
        'Designed and developed a custom reusable dropdown component as a library with features like view/edit control and multi-selection.',
      ],
    },
    eGain: {
      name: 'eGain Communications',
      location: 'Sunnyvale, CA',
      time: 'Mar 2016 - Nov 2017',
      title: 'Solutions Engineer',
      website: 'https://www.egain.com/',
      projects: [
        'Building customized web packages for small and medium scale suites. Web page development using eGain REST APIs to extract data and display it using AngularJs and other front-end frameworks.',
        'Customizable Single Sign-on using Security Assertion Markup Language(SAML). Designed and implemented web service which collects data from SAML response and passes it to eGain application for routing.',
        'Development of SDK that enables chat using SMS and Facebook Messenger using Twilio Client API and Facebook Messenger API.',
        'Develop interfaces to implement functionalities to cover product gap. and Backup functionalities.',
      ],
    },
    Kareo: {
      name: 'Kareo',
      link:'',
      location: 'Irvine, CA',
      time: 'Jun 2015 - Dec 2015',
      title: 'Software Engineer Intern',
      website: 'https://www.kareo.com/',
      projects: [
        'Developed functionality such as dynamically expandable UILabel (custom rendering) based on the input typed by the user, custom UIPickerView (remote data source) to show custom content for customer contact forms.',
        'Developed a CG Extension, to draw shapes on images with editable properties(color, width, text). Worked extensively on UITableview with custom cells. Built purely in Objective-C using Core Graphics APIs.',
      ],
    },
    Borqs: {
      name: 'Borqs',
      location: 'Bangalore, India',
      time: 'Aug 2012 - Jul 2013',
      title: 'Software Engineer',
      website: 'http://www.borqs.com/',
      projects: [
        'Developed features for android frameworks related to home screen widgets and lock screens for various network provider companies. Developed resizable widgets that generated extendable views.',
        'Managed migration of the android frameworks from older to newer releases by reducing UI compatibility issues.',
        'Designed and executed test procedures for enhanced launcher and app widgets by adding animation using OpenGL.',
      ],
    },
  },
  projects: {
    'NCHS Dashboard': {
      title: 'Data Visualization Dashboard',
      description: 'Sunburst and Grid representation of National Center for Health Statistics data, with auto-complete search and sorting functionality.',
      technologies: ['React', 'Express', 'Lodash', 'CSS'],
      githubLink: 'https://github.com/stuthib/React-Apps/tree/master/grid_dashboard',
      projectDetails: ['Sunburst Chart representation of the entire data provided by National Center for Health Statistics. This is an overall view of the given data.',
        'Clicking on one of the states, shows the detailed view. Example, clicking on California on the above chart represents this view.',
        'Grid representation of the data, which handles pagination for large data, column sorting and serach/filter along with auto-complete.',
      ]
    },
    'Tic-Tac-Toe': {
      title: 'Tic Tac Toe Game',
      description: 'Two player game application implements a countdown timer, and algorithm to decide the outcome.',
      technologies: ['React', 'MaterialUI', 'Lodash'],
      githubLink: 'https://github.com/stuthib/React-Apps/tree/master/tic_tac_toe',
      projectDetails: ['State of the game before the palayers start the game.',
        'Representation of a countdown timer during the game.',
        'Implementation of an algorithm to decide the outcome of the game.',
      ]
    },
  },
}

export default constants;
