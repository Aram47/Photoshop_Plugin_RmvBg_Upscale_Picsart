class Onboarding {
    constructor(root) {
        this.root = root;
        this.paragraphTexts = {
            1 : "Contrast: Snaps taken in great lighting \
            conditions with a strong contrast between the \
            subject and the background will give awesome results. \n \
            Alignment: Make sure to upload pictures with the right orientation. \
            The best outcome is obtained when the picture aligns with gravity \
            (meaning the ground is at the bottom of the image).\n \
            Plain backgrounds preferred: Blurry and single-colored \
            backgrounds are easier to remove compared to sharp backgrounds packed \
            with lots of details.",
            
            2 : "Contrast: Snaps taken in great lighting \
            conditions with a strong contrast between the \
            subject and the background will give awesome results. \n \
            Alignment: Make sure to upload pictures with the right orientation. \
            The best outcome is obtained when the picture aligns with gravity \
            (meaning the ground is at the bottom of the image).\n \
            Plain backgrounds preferred: Blurry and single-colored \
            backgrounds are easier to remove compared to sharp backgrounds packed \
            with lots of details.",
            
            3 : "Clear foreground: If the foreground is blurry, it might not \
            be removed. Even if only the edges are blurry, they'll remain blurry \
            in the cutout, which may or may not be an issue.",
            
            4 : "Clear foreground: If the foreground is blurry, it might not \
            be removed. Even if only the edges are blurry, they'll remain blurry \
            in the cutout, which may or may not be an issue.",
            
            5 : "Clear foreground: If the foreground is blurry, it might not \
            be removed. Even if only the edges are blurry, they'll remain blurry \
            in the cutout, which may or may not be an issue.",
            
            6 : "Number of people: Images with one person or a few people tend \
            to work better than pictures with large groups of people.\n \
            Objects: Small objects held or worn by people (like a basketball) \
            are usually supported, while large objects that stand out can be problematic.",
            
            7 : "Full object visibility: The whole product should be clearly \
            visible in the picture, without any part being cut off.",
            
            8 : "Focus on the object: Take products out of their packaging and \
            place them against a plain background (like a photo studio, wall, or floor).",
            
            9 : "Number of objects: Images with one object tend to work better than \
            pictures with large groups of people.",
            
            10 : "Avoid shadows and reflections: Try to steer clear of harsh shadows, \
            as they can be mistaken for part of the foreground. Also, avoid reflections, \
            especially in the background.",
            
            11 : "No decorations: Don't include decorative objects in the photo. Don't \
            add logos, stamps, or clip-arts to the picture before uploading it.",
            
            12 : "Avoid extreme angles: Capture the photo from a natural perspective, \
            approximately at eye level.\n \
            Unobstructed view: Make sure there's nothing blocking the view of the car \
            from the front.\n \
            One car at a time: For optimal results, only include one car in each photo. \
            Only the largest visible car will be cut out, while everything else is \
            considered part of the background.",
        };
        this.headTexts = {
            1  : "General tips",
            2  : "General tips",
            3  : "General tips",
            4  : "General tips",
            5  : "General tips",
            6  : "Tips for people photos (applicable for animals too)",
            7  : "Tips for product photos and other objects",
            8  : "Tips for product photos and other objects",
            9  : "Tips for product photos and other objects",
            10 : "Tips for product photos and other objects",
            11 : "Tips for product photos and other objects",
            12 : "Tips for car photos",
        };
        this.countOfPages = 12;
        this.currentPage = 1;
        this.board = document.createElement('div');
        this.boardHeader = document.createElement('div');
        this.boardBody = document.createElement('div');
        this.boardFooter = document.createElement('div');
        this.boardHeaderHeadText = document.createElement('h3');
        this.boardHeaderParagraphText = document.createElement('p');
        this.boardBodyImg = document.createElement('img');
        this.boardFooterNext = document.createElement('div');
        this.boardFooterPrev = document.createElement('div');
        this.boardFooterClose = document.createElement('div');
        this.buttonNext = document.createElement('button');
        this.buttonPrev = document.createElement('button');
        this.buttonClose = document.createElement('button');
    }
    buildTree() {
        this.boardFooterNext.appendChild(this.buttonNext);
        this.boardFooterPrev.appendChild(this.buttonPrev);
        this.boardFooterClose.appendChild(this.buttonClose);
        this.boardFooter.appendChild(this.boardFooterNext);
        this.boardFooter.appendChild(this.boardFooterPrev);
        this.boardFooter.appendChild(this.boardFooterClose);
        this.boardBody.appendChild(this.boardBodyImg);
        this.boardHeader.appendChild(this.boardHeaderHeadText);
        this.boardHeader.appendChild(this.boardHeaderParagraphText);
        this.board.appendChild(this.boardBody);
        this.board.appendChild(this.boardHeader);
        this.board.appendChild(this.boardFooter);
        this.root.appendChild(this.board);
    }
    eventListenerAdder(closeCb) {

        this.buttonNext.addEventListener('click', () => {
            if (this.currentPage + 1 === 13) {
                this.board.style.display = "none";
                closeCb();
                return;
            }
            ++(this.currentPage);
            this.boardHeaderHeadText.textContent = this.headTexts[this.currentPage];
            this.boardHeaderParagraphText.textContent = this.paragraphTexts[this.currentPage];
            this.boardBodyImg.src = `../img/${this.currentPage}.jpg`;
        });
        this.buttonPrev.addEventListener('click', () => {
            if (this.currentPage - 1 === 0) {
                return;
            }
            --(this.currentPage);
            this.boardHeaderHeadText.textContent = this.headTexts[this.currentPage];
            this.boardHeaderParagraphText.textContent = this.paragraphTexts[this.currentPage];
            this.boardBodyImg.src = `../img/${this.currentPage}.jpg`;
        });
        this.buttonClose.addEventListener('click', () => {
            this.board.style.display = "none";
            closeCb();
        });
    }
    createStyles() {
        this.setBoardStyle();
        this.setBoardHeaderStyle();
        this.setBoardBodyStyle();
        this.setBoardFooterStyle();
        this.setBoardHeaderHeadTextStyle();
        this.setBoardHeaderParagraphTextStyle();
        this.setBoardBodyImgStyle();
        this.setBoardFooterDivsStyle(this.boardFooterNext);
        this.setBoardFooterDivsStyle(this.boardFooterNext);
        this.setBoardFooterDivsStyle(this.boardFooterClose);
        this.setButtonStyle(this.buttonNext, "next");
        this.setButtonStyle(this.buttonPrev, "prev");
        this.setButtonStyle(this.buttonClose, "close");
    }
    show(cbOnbooardingIsFinished) {
        this.createStyles();
        this.eventListenerAdder(cbOnbooardingIsFinished);
        this.buildTree();
    }
    setBoardStyle() {

    }
    setBoardHeaderStyle() {

    }
    setBoardBodyStyle() {

    }
    setBoardFooterStyle() {
        this.boardFooter.style.display = "flex";
    }
    setBoardHeaderHeadTextStyle() {
        this.boardHeaderHeadText.textContent = this.headTexts[this.currentPage];
    }
    setBoardHeaderParagraphTextStyle() {
        this.boardHeaderParagraphText.textContent = this.paragraphTexts[this.currentPage];
    }
    setBoardBodyImgStyle() {
        this.boardBodyImg.src = `../img/${this.currentPage}.jpg`;
    }
    setBoardFooterDivsStyle(footerDiv) {
        footerDiv.style.display = "flex";
    }
    setButtonStyle(button, value) {
        button.textContent = value;
        button.style.color = "white";
        button.style.backgroundColor = "black";
    }
};

module.exports = {Onboarding,};