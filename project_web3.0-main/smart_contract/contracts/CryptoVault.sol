// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoVault is ReentrancyGuard, Ownable {
    struct Vault {
        uint256 balance;
        uint256 stakedAmount;
        uint256 stakingStartTime;
        bool isStaking;
    }

    mapping(address => Vault) public vaults;
    IERC20 public token;
    uint256 public totalStaked;
    uint256 public stakingRewardRate = 5; // 5% APY
    uint256 public minimumStakingPeriod = 7 days;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event StakingStarted(address indexed user, uint256 amount);
    event StakingEnded(address indexed user, uint256 amount, uint256 reward);

    constructor(address _token) {
        token = IERC20(_token);
    }

    function deposit(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        
        vaults[msg.sender].balance += _amount;
        emit Deposited(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        require(_amount <= vaults[msg.sender].balance, "Insufficient balance");
        require(!vaults[msg.sender].isStaking, "Cannot withdraw while staking");

        vaults[msg.sender].balance -= _amount;
        require(token.transfer(msg.sender, _amount), "Transfer failed");
        emit Withdrawn(msg.sender, _amount);
    }

    function startStaking(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        require(_amount <= vaults[msg.sender].balance, "Insufficient balance");
        require(!vaults[msg.sender].isStaking, "Already staking");

        vaults[msg.sender].balance -= _amount;
        vaults[msg.sender].stakedAmount = _amount;
        vaults[msg.sender].stakingStartTime = block.timestamp;
        vaults[msg.sender].isStaking = true;
        totalStaked += _amount;

        emit StakingStarted(msg.sender, _amount);
    }

    function endStaking() external nonReentrant {
        require(vaults[msg.sender].isStaking, "Not staking");
        require(
            block.timestamp >= vaults[msg.sender].stakingStartTime + minimumStakingPeriod,
            "Minimum staking period not met"
        );

        uint256 stakedAmount = vaults[msg.sender].stakedAmount;
        uint256 stakingDuration = block.timestamp - vaults[msg.sender].stakingStartTime;
        uint256 reward = calculateReward(stakedAmount, stakingDuration);

        vaults[msg.sender].balance += stakedAmount + reward;
        vaults[msg.sender].stakedAmount = 0;
        vaults[msg.sender].isStaking = false;
        totalStaked -= stakedAmount;

        emit StakingEnded(msg.sender, stakedAmount, reward);
    }

    function calculateReward(uint256 _amount, uint256 _duration) public view returns (uint256) {
        return (_amount * stakingRewardRate * _duration) / (365 days * 100);
    }

    function getVaultInfo(address _user) external view returns (Vault memory) {
        return vaults[_user];
    }

    function setStakingRewardRate(uint256 _newRate) external onlyOwner {
        require(_newRate > 0, "Invalid rate");
        stakingRewardRate = _newRate;
    }

    function setMinimumStakingPeriod(uint256 _newPeriod) external onlyOwner {
        require(_newPeriod > 0, "Invalid period");
        minimumStakingPeriod = _newPeriod;
    }
} 