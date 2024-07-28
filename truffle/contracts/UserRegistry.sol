// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    struct User {
        string username;
        string name;
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
    event PostAdded(string content, uint256 id);

    function register(string memory _username, string memory _name) public returns (bytes32) {
        bytes32 userHash = keccak256(abi.encodePacked(_username, _name));
        users[userHash] = User(_username, _name);
        userHashes[msg.sender] = userHash;
        emit UserRegistered(userHash, _username, _name);
        return userHash;
    }

    function login(bytes32 _userHash) public view returns (string memory, string memory) {
        User memory user = users[_userHash];
        require(bytes(user.username).length != 0, "User not found.");
        return (user.username, user.name);
    }

    function addPost(string memory _content) public {
        require(userHashes[msg.sender] != bytes32(0), "User must be logged in to add a post.");
        uint256 newPostId = postIdCounter++;
        posts.push(Post(_content, newPostId));
        emit PostAdded(_content, newPostId);
    }

    function viewPosts(uint256 startIndex, uint256 count) public view returns (Post[] memory) {
        require(startIndex < posts.length, "Start index out of bounds");
        
        uint256 endIndex = startIndex + count;
        if (endIndex > posts.length) {
            endIndex = posts.length;
        }

        Post[] memory postSubset = new Post[](endIndex - startIndex);
        for (uint256 i = startIndex; i < endIndex; i++) {
            postSubset[i - startIndex] = posts[i];
        }
        
        return postSubset;
    }
}
