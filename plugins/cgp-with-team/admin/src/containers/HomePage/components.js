import styled from 'styled-components';
import { Button, FilterIcon as Filter } from 'strapi-helper-plugin';
// import RemoveIcon from '../../assets/images/icon-cross-blue.svg';

const Wrapper = styled.div`
  padding-top: 1px;
`;

const FilterIcon = styled(Filter)`
  padding: 0 !important;
  margin: auto !important;
  > g {
    stroke: #282b2c;
  }
`;

const AddFilterCta = styled(Button)`
  display: flex;
  height: 30px;
  margin-right: 10px;
  padding: 0 10px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #e3e9f3;
  border-radius: 2px;
  line-height: 28px;
  font-size: 13px;
  font-weight: 500;
  font-family: Lato;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  &:hover {
    background: #f7f8f8;
  }
  &:focus,
  &:active {
    outline: 0;
  }
  > span {
    margin-left: 10px;
  }
`;

const Img = styled.img`
  height: 7px;
  margin: auto;
  margin-right: 0px;
  font-size: 12px;
`;

const FooterWrapper = styled.div`
  padding-top: 3rem;
`;

const Label = styled.label`
  display: inline-block;
  height: 32px;
  margin-left: 10px;
  line-height: 32px;
  color: #787e8f;
  font-size: 13px;
  font-style: italic;
`;

const SelectWrapper = styled.div`
  display: flex;
`;

const FilterWrapper = styled.div`
  display: inline-block;
  height: 30px;
  margin-bottom: 6px;
  margin-right: 10px;
  padding: 0 10px;
  background: rgba(0, 126, 255, 0.08);
  border: 1px solid rgba(0, 126, 255, 0.24);
  border-radius: 2px;
  line-height: 28px;
  color: #007eff;
  font-size: 13px;

  > span {
    display: inline-block;
    margin-top: -1px;
  }

  > span:nth-child(2) {
    font-weight: 700;
  }

  > span:nth-child(3) {
    cursor: pointer;
  }

  -webkit-font-smoothing: antialiased;
`;

const Separator = styled.span`
  height: 30px;
  margin-left: 10px;
  margin-right: 10px;
  line-height: 30px;
  &:after {
    content: '';
    height: 15px;
    border-left: 1px solid #007eff;
    opacity: 0.1;
  }
`;

// const Remove = styled.span`
//   height: 28px;
//   cursor: pointer;
//   vertical-align: middle;

//   &:after {
//     display: inline-block;
//     content: '';
//     width: 8px;
//     height: 8px;
//     margin: auto;
//     margin-top: -3px;
//     background-image: url(${RemoveIcon});
//   }
// `;

const Block = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 34px;
  background: #ffffff;
  padding: 19px 30px 30px 30px;
  box-shadow: 0 2px 4px 0 #e3e9f3;
  border-radius: 3px;
  line-height: 18px;

  a {
    position: relative;
    text-decoration: none;

    &:hover::after {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 0.3rem;
      content: '';
      opacity: 0.1;
      background: #ffffff;
    }
  }
  h2,
  p {
    line-height: 18px;
  }
  h2 {
    display: inline-block;
  }
  #mainHeader {
    &:after {
      content: '';
      width: 100%;
      height: 3px;
      margin-top: 4px;
      display: block;
      background: #f0b41e;
    }
  }

  .social-wrapper {
    span {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    > div:nth-child(2n) {
      padding-right: 0;
    }
  }
`;

const Container = styled.div`
  padding: 47px 13px 0 13px;
  > div {
    margin: 0;
  }
`;

const P = styled.p`
  max-width: 550px;
  padding-top: 10px;
  padding-right: 30px;
  color: #5c5f66;
  font-size: 14px;
  b {
    font-weight: 600;
  }
`;

const ControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 1px;
`;


export {
  AddFilterCta,
  FilterIcon,
  FooterWrapper,
  Img,
  Label,
  SelectWrapper,
  FilterWrapper,
  Separator,
  Wrapper,
  Container,
  Block,
  P,
  ControlsWrapper
};