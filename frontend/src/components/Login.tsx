import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";
import config from "../config.ts";
import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {Label} from "./ui/label";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card";

interface LocationState {
  isSignupButtonClicked: boolean;
}

interface ApiResponse {
  user: {
  _id: string;
  name?: string;
  email: string;
  };
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {isSignupButtonClicked} = (location.state as LocationState) || {};
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(isSignupButtonClicked || false);
  



}


