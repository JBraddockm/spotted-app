const users = new Map();
const posts = new Map();
const locations = new Map();

// Function to retrieve entities items from localStorage.
function loadEntityFromLocalStorage(key) {
  // Retrieves the stored data from localStorage
  const storedData = JSON.parse(localStorage.getItem(key));

  // If there's no stored data, return an empty Map.
  if (!storedData) {
    return new Map();
  }

  // Converts the stored data back into a Map.
  return new Map(storedData);
}

// Function to save entities to localStorage.
function saveEntityToLocalStorage(entity, key) {
  // Retrieves existing entities from localStorage.
  const collectionList = loadEntityFromLocalStorage(key);

  // Convert id to lowercase if it is a string to ensure its uniqueness.
  const id = (typeof entity.id === 'string') ? entity.id.toLowerCase() : entity.id;

  // Adds the new entity to the map.
  collectionList.set(id, entity);

  // Stores the updated map back in localStorage.
  localStorage.setItem(key, JSON.stringify([...collectionList]));
}

function getNextSequenceForEntity(key) {
  try {
    // Retrieves the stored data from localStorage
    const storedData = loadEntityFromLocalStorage(key);

    let nextId = false;

    if (storedData.size > 0) {
      nextId = (storedData.get(storedData.size).id) + 1;
    }

    return nextId;
  } catch (error) {
    console.error('Error generating sequence', error);
    return false; // Return false if saving fails
  }
}

// Function to abstract the CRUD operations for user object.
function PostRepository() {
  this.savePost = function (post) {
    try {
      // Save the updated post to localStorage
      saveEntityToLocalStorage(post, 'posts');

      return post; // Return true if saving succeeds
    } catch (error) {
      console.error('Error saving post:', error);
      return false; // Return false if saving fails
    }
  };

  this.createPost = function (post) {
    try {
      const createdPost = post;

      const nextId = getNextSequenceForEntity('posts');
      if (nextId) createdPost.id = nextId;

      return this.savePost(createdPost);
    } catch (error) {
      console.error('Error creating post:', error);
      return false; // Return false if saving fails
    }
  };

  this.findAll = function () {
    try {
      return Array.from(loadEntityFromLocalStorage('posts').values());
    } catch (error) {
      console.error('Error retrieving posts from localStorage:', error);
      return []; // Return an empty array if retrieval fails
    }
  };

  this.findPostById = function (postId) {
    try {
      let foundPost = false;
      const postsMap = loadEntityFromLocalStorage('posts');

      if (postsMap.has(postId)) {
        foundPost = postsMap.get(postId);
      }
      return foundPost;
    } catch (error) {
      console.error('Error retrieving posts from localStorage:', error);
      return []; // Return an empty array if retrieval fails
    }
  };
}

const postRepository = new PostRepository();

// Function to abstract the CRUD operations for user object.
function UserRepository() {
  this.saveUser = function (user) {
    try {
      // Save the updated user to localStorage
      saveEntityToLocalStorage(user, 'users');

      return user; // Return true if saving succeeds
    } catch (error) {
      console.error('Error saving user:', error);
      return false; // Return false if saving fails
    }
  };

  this.createUser = function (user) {
    try {
      const createdUser = user;

      const nextId = getNextSequenceForEntity('users');
      if (nextId) createdUser.id = nextId;

      return this.saveUser(createdUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return false; // Return false if saving fails
    }
  };

  this.findAll = function () {
    try {
      return Array.from(loadEntityFromLocalStorage('users').values());
    } catch (error) {
      console.error('Error retrieving users from localStorage:', error);
      return []; // Return an empty array if retrieval fails
    }
  };

  this.findUserById = function (userId) {
    try {
      let foundUser = false;
      const usersMap = loadEntityFromLocalStorage('users');

      if (usersMap.has(userId)) {
        foundUser = usersMap.get(userId);
      }
      return foundUser;
    } catch (error) {
      console.error('Error retrieving users from localStorage:', error);
      return []; // Return an empty array if retrieval fails
    }
  };

  this.findUserByUsername = function (username) {
    try {
      let foundUser = false;
      const usersMap = loadEntityFromLocalStorage('users');

      usersMap.forEach((value) => {
        if (value.username === username) {
          foundUser = value;
        }
      });
      return foundUser;
    } catch (error) {
      console.error('Error retrieving users from localStorage:', error);
      return false;
    }
  };

  this.findUserByEmail = function (emailAddress) {
    try {
      let foundUser = false;
      const usersMap = loadEntityFromLocalStorage('users');

      usersMap.forEach((value) => {
        if (value.emailAddress === emailAddress) {
          foundUser = value;
        }
      });
      return foundUser;
    } catch (error) {
      console.error('Error retrieving users from localStorage:', error);
      return false;
    }
  };

  this.getAllPostsByUserId = function (userId) {
    try {
      let allPosts = false;

      if (this.findUserById(userId)) {
        allPosts = postRepository.findAll();
        return allPosts.filter((element) => element.userId === userId);
      }

      return allPosts;
    } catch (error) {
      console.error('Error retrieving posts from localStorage:', error);
      return false;
    }
  };
}

const userRepository = new UserRepository();

function LocationRepository() {
  this.saveLocation = function (location) {
    try {
      // Save the updated location to localStorage
      saveEntityToLocalStorage(location, 'locations');

      return location; // Return true if saving succeeds
    } catch (error) {
      console.error('Error saving location:', error);
      return false; // Return false if saving fails
    }
  };

  this.findAll = function () {
    try {
      return Array.from(loadEntityFromLocalStorage('locations').values());
    } catch (error) {
      console.error('Error retrieving locations from localStorage:', error);
      return []; // Return an empty array if retrieval fails
    }
  };

  this.findLocationById = function (locationId) {
    try {
      let foundLocation = false;
      const locationsMap = loadEntityFromLocalStorage('locations');

      if (locationsMap.has(locationId)) {
        foundLocation = locationsMap.get(locationId);
      }
      return foundLocation;
    } catch (error) {
      console.error('Error retrieving location from localStorage:', error);
      return []; // Return an empty array if retrieval fails
    }
  };
  this.getLocationByPostId = function (postId) {
    try {
      let allLocations = false;

      if (postRepository.findPostById(postId)) {
        allLocations = this.findAll();
        return allLocations.filter((element) => element.postId === postId)[0];
      }

      return allLocations;
    } catch (error) {
      console.error('Error retrieving posts from localStorage:', error);
      return false;
    }
  };
}

const locationRepository = new LocationRepository();
