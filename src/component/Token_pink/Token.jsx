import * as React from "react";
import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Form from "react-bootstrap/Form";
import Web3 from "web3";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Tokenli from "../Token_list/Tokenli";
import thinken from "../Assets/think.png";
import Mylock from "../Mylock_detail/Mylock";
import {
  pinkSaleLockContract,
  pinkSaleLockAbi,
  tokenAbi,
  tokenAdress,
} from "../../utilies/Contract";
import { loadWeb3 } from "../../connectivity/connectivity";
import { useSelector, useDispatch } from "react-redux";
import { tokenData, userData, allTokensData } from "./userData.js";

import {
  connectWallet,
  walletaddress,
  connect,
  userLockedData,
  allLockedData,
} from "../../features/pinksale/pinksaleSlice";

const webSupply = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [userTokens, setUserTokens] = useState([]);
  const [allTokens, setAllTockens] = useState([]);

  const dispatch = useDispatch();

  let walletaddress = useSelector((state) => state.pinksale.walletaddress);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const myLocks = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      //   toast.error("No Wallet Connected")
    } else if (acc == "Wrong Network") {
      //   toast.error("Wrong Newtwork please connect to BSC MainNet ")
    } else {
      try {
        const web3 = window.web3;
        let _data = await userData(acc);
        console.log("_Data", _data["tokens"]);
        let arr = [];
        let obj = {};
        // console.log("User Data", _data);
        _data["tokens"].forEach(async (output) => {
          let token_data = await tokenData(output?.token);

          obj = {
            _amount: web3.utils.fromWei(output.amount),
            _description:
              output?.description == ""
                ? token_data["tokenName"]
                : output?.description,
            _id: output.id,
            _lockDate: output.lockDate,
            _owner: output.owner,
            _token: output.token,
            _unlockDate: output.unlockDate,
            _unlockedAmount: output.unlockedAmount,
            _symbol: token_data["tokenSymbol"],
            _tokenName: token_data["tokenName"],
            _tokenDecimals: token_data["tokenDecimals"],
          };
          arr = [...arr, obj];
          dispatch(userLockedData(arr));
          setUserTokens([...arr]);
        });

        // const web3 = window.web3;
        // let pinkSaleContract = new webSupply.eth.Contract(
        //   pinkSaleLockAbi,
        //   pinkSaleLockContract
        // );
        // let pinkSaleToken = new web3.eth.Contract(tokenAbi, tokenAdress);
        // let tokenName, tokenSymbol, tokenDecimal, tokenBalance;
        // tokenName = await pinkSaleToken.methods.name().call();
        // tokenSymbol = await pinkSaleToken.methods.symbol().call();
        // // console.log("ContractrOF", pinkSaleContract);
        // let lockTokens = await pinkSaleContract.methods
        //   .normalLocksForUser(acc)
        //   .call();
        // console.log("lockTokens", lockTokens);
        // lockTokens.forEach((element) => {
        //   console.log("Element", element);
        // });
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const allLocks = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      //   toast.error("No Wallet Connected")
    } else if (acc == "Wrong Network") {
      //   toast.error("Wrong Newtwork please connect to BSC MainNet ")
    } else {
      try {
        const web3 = window.web3;
        let _allTokensData = await allTokensData();
        console.log("_allTokensData", _allTokensData["allTokensArray"]);
        let arr = [];
        let obj = {};
        // console.log("User Data", _data);
        _allTokensData["allTokensArray"].forEach(async (output) => {
          // console.log("output", output);
          let token_data = await tokenData(output?.token);

          obj = {
            _amount: web3.utils.fromWei(output.amount),
            _description:
              output?.description == ""
                ? token_data["tokenName"]
                : output?.description,
            _id: output.id,
            _lockDate: output.lockDate,
            _owner: output.owner,
            _token: output.token,
            _unlockDate: output.unlockDate,
            _unlockedAmount: output.unlockedAmount,
            _symbol: token_data["tokenSymbol"],
            _tokenName: token_data["tokenName"],
            _tokenDecimals: token_data["tokenDecimals"],
          };
          console.log("obj", obj);
          arr = [...arr, obj];
          dispatch(allLockedData(arr));
          setAllTockens([...arr]);
        });

        // const web3 = window.web3;
        // let pinkSaleContract = new webSupply.eth.Contract(
        //   pinkSaleLockAbi,
        //   pinkSaleLockContract
        // );
        // let pinkSaleToken = new web3.eth.Contract(tokenAbi, tokenAdress);
        // let tokenName, tokenSymbol, tokenDecimal, tokenBalance;
        // tokenName = await pinkSaleToken.methods.name().call();
        // tokenSymbol = await pinkSaleToken.methods.symbol().call();
        // // console.log("ContractrOF", pinkSaleContract);
        // let lockTokens = await pinkSaleContract.methods
        //   .normalLocksForUser(acc)
        //   .call();
        // console.log("lockTokens", lockTokens);
        // lockTokens.forEach((element) => {
        //   console.log("Element", element);
        // });
      } catch (error) {
        // console.log(error);
      }
    }
  };

  //   console.log("state", userTokens);
  useEffect(() => {
    myLocks();
    allLocks();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 bg-light py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10 bg-white">
              <div className="mt-4">
                <Form.Control
                  type="search"
                  placeholder="Search by token address ..."
                />
              </div>
              <div className="mt-2">
                <Box sx={{ width: "100%" }}>
                  <div className="d-flex justify-content-end">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab
                        label="All"
                        {...a11yProps(0)}
                        className="text-capitalize"
                      />
                      <Tab
                        label="My Lock"
                        {...a11yProps(1)}
                        className="text-capitalize"
                      />
                    </Tabs>
                  </div>

                  <TabPanel value={value} index={0}>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Token</span>
                      <span className="fw-bold">Amount</span>
                      <span className="mg_k"></span>
                    </div>
                    <div className="frnt_Main my-5">
                      {allTokens.map((tokendata, index) => {
                        console.log("data", tokendata);
                        return (
                          <div className="mt-3">
                            <Tokenli
                              token_pic={thinken}
                              text_one={tokendata._description}
                              text_tow={tokendata._symbol}
                              amount1={tokendata._amount}
                              amount2={tokendata._symbol}
                              tokenName={tokendata._tokenName}
                              fullpage="View"
                              index={index}
                            />
                          </div>
                        );
                      })}
                      {/* <div className="mt-3">
                        <Tokenli
                          token_pic={thinken}
                          text_one="TaleCraft"
                          text_tow="CRAFT"
                          amount1="200,000,000"
                          amount2="CRAFT"
                          fullpage="View"
                        />
                      </div> */}
                    </div>

                    <div className="pgnation d-flex justify-content-center">
                      <Stack spacing={2}>
                        <Pagination
                          count={10}
                          variant="outlined"
                          shape="rounded"
                        />
                      </Stack>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Token</span>
                      <span className="fw-bold">Amount</span>
                      <span className="mg_k"></span>
                    </div>

                    <div className="frnt_Main my-5">
                      <div>
                        {userTokens.map((tokendata, index) => {
                          return (
                            <div className="mt-3">
                              <Mylock
                                token_pic={thinken}
                                text_one={tokendata._description}
                                text_tow={tokendata._symbol}
                                amount1={tokendata._amount}
                                amount2={tokendata._symbol}
                                fullpage="View"
                                index={index}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </TabPanel>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
