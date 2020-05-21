import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { NavLink } from "react-router-dom"

import MainFeaturedProject from './MainFeaturedProject';
import MainQuickAbout from './MainQuickAbout';
import MainFeaturedAlbum from './MainFeaturedAlbum';
import featured_image from "../assets/images/featured_image.jpg"

const mainFeaturedProject = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: `url(${featured_image})`,
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

export default function Landing() {
	return (
    <div className="Landing">
      <MainFeaturedProject post={mainFeaturedProject} />
      <MainQuickAbout/>
      <MainFeaturedAlbum/>
    </div>
  );
}