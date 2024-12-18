// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

/// @custom:security-contact hello@getsherry.app
contract SherryChristmas is ERC1155, Ownable {
    // Maximum supply for each token ID
    uint8 public constant MAX_SUPPLY = 20;

    // Total number of unique token types
    uint8 public constant TOTAL_TOKENS = 20;

    string private baseURI = "https://ipfs.io/ipfs/CID/";

    mapping(uint256 => uint256) private _minted;

    event UriUpdated(string indexed uri);

    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {}

    function setURI(string memory _newuri) public onlyOwner {
        baseURI = _newuri;
        emit UriUpdated(_newuri);
    }

    function uri(
        uint256 _tokenId
    ) public view override returns (string memory) {
        require(
            tokenExists(_tokenId),
            "SherryChristmas: URI query for nonexistent token"
        );
        return string(abi.encodePacked(baseURI, Strings.toString(_tokenId)));
    }

    function mint(uint256 _tokenId) external {
        require(tokenExists(_tokenId), "SherryChristmas: tokenId out of range");
        require(
            _minted[_tokenId] < MAX_SUPPLY,
            "SherryChristmas: token supply reached maximum"
        );
        _minted[_tokenId]++;
        _mint(msg.sender, _tokenId, 1, "");
    }

    function tokenExists(uint256 _tokenId) public pure returns (bool) {
        return _tokenId > 0 && _tokenId <= TOTAL_TOKENS;
    }
}
