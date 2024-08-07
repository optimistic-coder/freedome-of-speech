// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    struct User {
        string username;
        string name;
        bytes32 hash;
    }

    struct Post {
        string content;
        uint256 id;
    }

    mapping(bytes32 => User) private users;
    mapping(address => bytes32) private userHashes;
    Post[] private posts;
    uint256 private postIdCounter;

    event UserRegistered(bytes32 userHash, string username, string name);
    event UserLoggedIn(bytes32 userHash, string username);
    event UserLoggedOut(bytes32 userHash, string username);
    event PostAdded(string content, uint256 id);

    function register(string memory _username, string memory _name) public returns (bytes32, string memory, string memory) {
        bytes32 userHash = keccak256(abi.encodePacked(_username, _name));
        users[userHash] = User(_username, _name, userHash);
        userHashes[msg.sender] = userHash;
        emit UserRegistered(userHash, _username, _name);
        return (userHash, _username, _name);
    }

    function login(bytes32 _userHash) public returns (string memory, string memory) {
        User memory user = users[_userHash];
        require(bytes(user.username).length != 0, "User not found.");
        userHashes[msg.sender] = _userHash; // Map user hash to the current address
        emit UserLoggedIn(_userHash, user.username);
        return (user.username, user.name);
    }

    function addPost(string memory _content) public {
        require(userHashes[msg.sender] != bytes32(0), "User must be logged in to add a post.");
        uint256 newPostId = postIdCounter++;
        posts.push(Post(_content, newPostId));
        emit PostAdded(_content, newPostId);
    }

    function viewPosts(uint256 startIndex, uint256 count) public view returns (Post[] memory) {
        require(startIndex < posts.length, "Start index out of range");
        uint256 endIndex = startIndex + count > posts.length ? posts.length : startIndex + count;
        Post[] memory paginatedPosts = new Post[](endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            paginatedPosts[i - startIndex] = posts[i];
        }
        return paginatedPosts;
    }

    function getUserHash(address userAddress) public view returns (bytes32) {
        return userHashes[userAddress];
    }

    function logout() public {
        require(userHashes[msg.sender] != bytes32(0), "User is not logged in.");
        bytes32 userHash = userHashes[msg.sender];
        userHashes[msg.sender] = bytes32(0); // Clear the user hash mapping for the current address
        User memory user = users[userHash];
        emit UserLoggedOut(userHash, user.username);
    }
}
