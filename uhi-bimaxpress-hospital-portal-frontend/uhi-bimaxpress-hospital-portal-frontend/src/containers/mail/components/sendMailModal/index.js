import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import styles from "./sendMailModal.module.css";
import customScrollBar from "../../../../scrollbar.module.css";
import { MdOutlineClose } from "react-icons/md";
import notification from "../../../shared/notification";
import axiosConfig from "../../../../config/axiosConfig";
import { IoClose } from "react-icons/io5";

import paperclip_black from "../../../../assets/icon/paperclip_black.svg";
import bold from "../../../../assets/icon/bold.svg";
import italic from "../../../../assets/icon/italic.svg";
import underline from "../../../../assets/icon/underline.svg";
import align_center_alt from "../../../../assets/icon/align-center-alt.svg";
import align_left from "../../../../assets/icon/align_left.svg";
import align_right from "../../../../assets/icon/align_right.svg";
import ReactHtmlParser from "react-html-parser";
import SharedButton from "../../../shared/button";

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SendMailModal = (props) => {
  const {
    openSendMailModal,
    tooggleOpenSendMailModal,
    setSharedLoaderActivity,
    userDetails,
    type,
    selectedMessage,
  } = props;

  const bodyRef = useRef(null);
  const [mail, setMail] = useState({
    to: "",
    cc: "",
    bcc: "",
    sub: "",
    body: "",
    file: [],
    headerName: "",
  });

  const removeImage = (name) => {
    setMail((pre) => ({
      ...pre,
      file: pre?.file?.filter((files) => files?.name !== name),
    }));
  };

  const runCommand = (command) => {
    document.execCommand(command, false, undefined);
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;

    if (name === "file") {
      setMail((pre) => ({
        ...pre,

        [name]: [...pre[name], ...e?.target?.files],
      }));
    } else {
      setMail((pre) => ({ ...pre, [name]: value }));
    }
  };

  const sendMail = async () => {
    console.log(mail);
    if (!String(mail.to).toLowerCase().match(regexEmail)) {
      return notification("warning", "Vaild sender email is required!");
    }

    if (mail.cc && !String(mail.cc).toLowerCase().match(regexEmail)) {
      return notification("warning", "Vaild cc email is required!");
    }

    if (mail.bcc && !String(mail.bcc).toLowerCase().match(regexEmail)) {
      return notification("warning", "Vaild bcc email is required!");
    }

    if (mail.sub.length < 4) {
      return notification("warning", "Need atleast four character subject");
    }

    if (bodyRef?.current?.innerText.length < 4) {
      return notification("warning", "Need atleast four character body");
    }

    const formData = new FormData();
    setSharedLoaderActivity(true);

    mail?.to && formData.append("to", mail?.to);
    mail?.cc && formData.append("cc", mail?.cc);
    mail?.bcc && formData.append("bcc", mail?.bcc);
    mail?.sub && formData?.append("sub", mail?.sub);
    bodyRef?.current?.innerText &&
      formData?.append("text", bodyRef?.current?.innerText);

    if (mail?.file?.length) {
      mail?.file.forEach((file) => {
        formData.append("attachments", file);
      });
    }

    if (type === "Reply" || type === "Forward") {
      selectedMessage?.attachments?.map((attachment) => {
        const arr = new Uint8Array(attachment.content.data);
        const blob = new Blob([arr], {
          type: attachment.contentType,
        });

        formData.append("attachments", blob, attachment.filename);
      });
    }
    try {
      await axiosConfig.post(
        `${process.env.REACT_APP_EMAIL_API}/mail/sendMail?email=${userDetails?.data?.email}`,
        formData
      );

      setSharedLoaderActivity(false);
      notification("info", `Mail has been sent`);
      tooggleOpenSendMailModal();
    } catch (error) {
      setSharedLoaderActivity(false);
      notification("error", error?.message);
    }
  };

  useEffect(() => {
    switch (type) {
      case "Compose":
        setMail((pre) => ({
          ...pre,
          to: "",
          cc: "",
          bcc: "",
          sub: ``,
          file: [],
          body: ``,
          headerName: "Compose Mail",
        }));
        break;
      case "Reply":
        setMail((pre) => ({
          ...pre,
          to: `${selectedMessage.from}`,
          cc: "",
          bcc: "",
          sub: `RE: ${selectedMessage.subject}`,
          file: [],
          body: `${selectedMessage.textAsHtml}`,
          headerName: "Reply Mail",
        }));
        break;

      case "Forward":
        setMail((pre) => ({
          ...pre,
          to: ``,
          cc: "",
          bcc: "",
          sub: `Fwd: ${selectedMessage.subject}`,
          file: [],
          body: `${selectedMessage.textAsHtml}`,
          headerName: "Forward Mail",
        }));
        break;
    }
  }, [type]);

  return (
    <Modal
      isOpen={openSendMailModal}
      className={`${styles.approveModalContainer} ${customScrollBar.customScroll} max-h-[550px] overflow-y-auto`}
      overlayClassName={styles.overlayContainer}
      onRequestClose={tooggleOpenSendMailModal}
      shouldCloseOnOverlayClick={true}
    >
      <div
        className={`flex items-center justify-between h-10 w-full bg-primary px-4 border-none outline-none ${styles.composeModalHeader}`}
      >
        <div className="flex justify-between items-center">
          <p className="text-base text-fontColor tracking-wide capitalize">
            {mail.headerName}
          </p>
          <IoClose
            className="absolute right-4 w-5 h-5 p-1 bg-red-500 rounded-full text-white cursor-pointer"
            onClick={tooggleOpenSendMailModal}
          />
        </div>
      </div>

      <div className="px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex items-center flex-wrap">
        <p className="mr-2 mb-1">To</p>
        <input
          className="border-none outline-none flex-auto"
          value={mail?.to}
          name="to"
          onChange={handleChange}
        />
      </div>

      <div className="px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex items-center flex-wrap">
        <p className="mr-2 mb-1">CC</p>
        <input
          className="border-none outline-none flex-auto"
          value={mail?.cc}
          name="cc"
          onChange={handleChange}
        />
      </div>

      <div className="px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex items-center flex-wrap">
        <p className="mr-2 mb-1">BCC</p>
        <input
          className="border-none outline-none flex-auto"
          value={mail?.bcc}
          name="bcc"
          onChange={handleChange}
        />
      </div>
      <div className="px-4 py-2 text-sm text-fontColor-darkGray border-t border-fontColor-gray tracking-wide flex">
        <input
          className="border-none outline-none text-primary font-medium flex-auto"
          value={mail?.sub}
          name="sub"
          onChange={(e) => handleChange(e)}
          placeholder="Subject"
        />
      </div>

      <div
        className="px-4 py-2 pb-4 text-sm text-fontColor-darkGray border-t border-b border-fontColor-gray tracking-wide outline-none"
        style={{ minHeight: "250px" }}
        contentEditable={true}
        ref={bodyRef}
        suppressContentEditableWarning={true}
      >
        {ReactHtmlParser(mail?.body)}
      </div>

      <div className="flex items-center flex-wrap">
        {mail?.file?.length
          ? mail?.file?.map((file, index) => {
              return (
                <div
                  className="bg-fontColor-gray text-sm flex items-center justify-between  h-8 px-2 mr-2 rounded-sm mx-4 mt-4 overflow-hidden "
                  style={{ width: "100%", maxWidth: "145px" }}
                  key={index}
                >
                  <p
                    style={{
                      width: "100%",
                      maxWidth: "125px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {file?.name}
                  </p>
                  <IoClose onClick={() => removeImage(file?.name)} />
                </div>
              );
            })
          : null}
      </div>
      <div className=" flex items-center py-8 p px-4 gap-x-4">
        <SharedButton text="Send" handleClick={sendMail} />

        <div className="relative w-4 h-8 cursor-pointer">
          <img
            src={paperclip_black}
            alt="icon"
            className="absolute top-2 cursor-pointer"
          />
          <input
            type="file"
            className="absolute border-none outline-none cursor-pointer opacity-0 w-full h-full top-0 left-0 "
            name="file"
            onChange={handleChange}
            multiple
          />
        </div>
        <div
          className="flex items-center p-3 rounded"
          style={{ backgroundColor: "#EEEEEE" }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={bold}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("bold")}
            onMouseDown={(e) => e.preventDefault()}
          />

          <img
            src={italic}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("italic")}
            onMouseDown={(e) => e.preventDefault()}
          />
          <img
            src={underline}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("underline")}
            onMouseDown={(e) => e.preventDefault()}
          />

          <img
            src={align_right}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("justifyLeft")}
            onMouseDown={(e) => e.preventDefault()}
          />
          <img
            src={align_center_alt}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("justifyCenter")}
            onMouseDown={(e) => e.preventDefault()}
          />
          <img
            src={align_left}
            alt="icon"
            className="mr-3 cursor-pointer"
            onClick={() => runCommand("justifyRight")}
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SendMailModal;
