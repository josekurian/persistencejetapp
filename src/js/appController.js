/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function(oj, ko) {
     function ControllerViewModel() {
       var self = this;

       window.addEventListener('online',  onlineHandler);
       window.addEventListener('offline', offlineHandler);

       self.online = ko.observable(true);

       function onlineHandler() {
         if(self.online()) {
           return;
         }

         self.online(true);
       }

       function offlineHandler() {
         if(!self.online()) {
           return;
         }

         document.body.classList.add('offline');

         self.online(false);
       }

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'dashboard': {label: 'Dashboard', isDefault: true}
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [
      {name: 'Dashboard', id: 'dashboard',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'}
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {oj.OffcanvasUtils.close(self.drawerParams);});
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }
      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("Red Samurai Offline Toolkit Application");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("abaranovskis@redsamuraiconsulting.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Red Samurai Consulting', 'aboutOracle', 'http://www.redsamuraiconsulting.com/'),
        new footerLink('Contact Us', 'contactUs', 'http://www.redsamuraiconsulting.com/'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.redsamuraiconsulting.com/'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.redsamuraiconsulting.com/'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.redsamuraiconsulting.com/')
      ]);
     }

     return new ControllerViewModel();
  }
);
