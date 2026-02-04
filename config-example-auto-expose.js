/**
 * Example configuration file for sails-adminpanel with auto-expose enabled
 *
 * This configuration automatically exposes ALL your Sails models in the admin panel.
 * You only need to specify what to HIDE or CUSTOMIZE.
 *
 * Copy this to your Sails project as: config/adminpanel.js
 */

'use strict';

module.exports.adminpanel = {

  /**
   * Enable authentication (recommended for production)
   */
  auth: true,

  /**
   * Auto-expose all models with default configuration
   * This will automatically create admin panel entries for all your Sails models
   */
  autoExposeModels: true,

  /**
   * Exclude specific models from the admin panel
   * Default: ['userap', 'groupap', 'archive']
   *
   * The 'userap' and 'groupap' models are used internally by the admin panel
   * for authentication and access rights, so they're excluded by default.
   */
  excludeModels: [
    'userap',      // Admin panel user model (excluded by default)
    'groupap',     // Admin panel group model (excluded by default)
    'archive',     // Archive model (excluded by default)
    // Add your models to exclude here:
    // 'secretmodel',
    // 'internaldata',
  ],

  /**
   * Hide specific attributes globally across all models
   * These fields will not appear in any model's list/add/edit views
   */
  hideAttributes: [
    'password',
    'passwordHashed',
    'passwordHash',
    'token',
    'apiKey',
    // Uncomment if you want to hide timestamps:
    // 'createdAt',
    // 'updatedAt',
  ],

  /**
   * Customize specific models (optional)
   * These configurations will OVERRIDE the auto-generated config
   *
   * You only need to add models here if you want to customize them
   * beyond the auto-generated configuration
   */
  models: {
    // Example: Customize the User model
    // user: {
    //   title: 'Users',
    //   model: 'User',
    //   icon: 'user',
    //   list: {
    //     fields: {
    //       id: 'ID',
    //       email: 'Email Address',
    //       fullName: 'Name',
    //       isActive: 'Active'
    //     }
    //   },
    //   edit: {
    //     fields: {
    //       email: 'Email Address',
    //       fullName: 'Full Name',
    //       isActive: {
    //         type: 'boolean',
    //         title: 'Active User'
    //       }
    //     }
    //   }
    // }
  },

  /**
   * Optional: Set custom admin credentials
   * If not set, a random password will be generated on first startup
   */
  // administrator: {
  //   login: 'admin',
  //   password: 'your-secure-password'
  // },

  /**
   * Optional: Custom route prefix
   * Default: '/admin'
   */
  // routePrefix: '/admin',

  /**
   * Optional: Custom branding
   */
  // brand: {
  //   link: {
  //     title: 'My Admin Panel',
  //     link: '/admin'
  //   }
  // }
};
