CREATE TABLE IF NOT EXISTS USERS (
	UserID INT PRIMARY KEY AUTO_INCREMENT,
	Name VARCHAR(255) NOT NULL,
	Email VARCHAR(255) NOT NULL UNIQUE,
	PASSWORD VARCHAR(255) NOT NULL,
	Phone VARCHAR(20),
	AddressLine1 VARCHAR(255),
	AddressLine2 VARCHAR(255),
	Zip VARCHAR(10),
	UserType ENUM (
		'farmer',
		'retailer',
		'wholesaler',
		'customer',
		'admin'
	) NOT NULL,
	FOREIGN KEY (Zip) REFERENCES ZIP_CODE (Zip)
);

CREATE TABLE IF NOT EXISTS FARMER (
	UserID INT PRIMARY KEY,
	Gender ENUM ('male', 'female', 'other'),
	FOREIGN KEY (UserID) REFERENCES USERS (UserID)
);

CREATE TABLE IF NOT EXISTS CUSTOMER (
	UserID INT PRIMARY KEY,
	FOREIGN KEY (UserID) REFERENCES USERS (UserID)
);

CREATE TABLE IF NOT EXISTS VENDOR (
	LicenseID INT PRIMARY KEY AUTO_INCREMENT,
	UserID INT,
	RegistrationDate DATE,
	VendorType ENUM ('wholesaler', 'retailer'),
	FOREIGN KEY (UserID) REFERENCES USERS (UserID)
);

CREATE TABLE IF NOT EXISTS WHOLESALER (
	WLicenseID INT PRIMARY KEY,
	MinOrderQuantity INT,
	FOREIGN KEY (WLicenseID) REFERENCES VENDOR (LicenseID)
);

CREATE TABLE IF NOT EXISTS RETAILER (
	RLicenseID INT PRIMARY KEY,
	StoreType VARCHAR(100),
	FOREIGN KEY (RLicenseID) REFERENCES VENDOR (LicenseID)
);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Robert Taylor',
		'user1@example.com',
		'hashed_password1',
		'01718892528',
		'298 Adrian Wall',
		NULL,
		'48109',
		'admin'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Michael Guzman',
		'user2@example.com',
		'hashed_password2',
		'01719665898',
		'8551 John Parks',
		'Suite 430',
		'14619',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Travis Hicks MD',
		'user3@example.com',
		'hashed_password3',
		'01714776394',
		'9635 Valencia Drive',
		NULL,
		'52348',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Timothy Newton',
		'user4@example.com',
		'hashed_password4',
		'01718526076',
		'546 Mariah Crest Suite 587',
		'Apt. 556',
		'19144',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'William Saunders',
		'user5@example.com',
		'hashed_password5',
		'01718729852',
		'74172 Cantu Summit Apt. 573',
		'Apt. 667',
		'75456',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Veronica Bray',
		'user6@example.com',
		'hashed_password6',
		'01719888697',
		'684 Hall Path',
		'Apt. 175',
		'14021',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Travis Hoover',
		'user7@example.com',
		'hashed_password7',
		'01719690570',
		'90614 Jessica Fall Apt. 250',
		'Apt. 006',
		'35503',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Beverly Underwood',
		'user8@example.com',
		'hashed_password8',
		'01714457865',
		'73089 Jones Fall',
		NULL,
		'84528',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Crystal Perry',
		'user9@example.com',
		'hashed_password9',
		'01719090201',
		'63609 Johnson Key Suite 572',
		'Apt. 411',
		'68024',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Michael Oliver',
		'user10@example.com',
		'hashed_password10',
		'01711343627',
		'3953 Romero Crest',
		'Apt. 718',
		'00784',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Julie Gibson',
		'user11@example.com',
		'hashed_password11',
		'01716074135',
		'64619 Wilkins Wall Apt. 735',
		'Suite 607',
		'19103',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Abigail Sullivan',
		'user12@example.com',
		'hashed_password12',
		'01712100935',
		'63477 Jeremy Haven Suite 792',
		'Apt. 348',
		'21863',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Barbara Brown',
		'user13@example.com',
		'hashed_password13',
		'01717846331',
		'59276 Robert Fields Apt. 605',
		'Apt. 528',
		'08220',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Michelle Wheeler',
		'user14@example.com',
		'hashed_password14',
		'01713748031',
		'97939 Johnson Oval Suite 830',
		'Apt. 023',
		'42573',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Michael Walker',
		'user15@example.com',
		'hashed_password15',
		'01715816543',
		'645 Jennings Estates',
		'Suite 857',
		'50986',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'William Stewart',
		'user16@example.com',
		'hashed_password16',
		'01711602869',
		'23126 Zimmerman Fords Suite 006',
		'Apt. 169',
		'28054',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Rachel Fernandez',
		'user17@example.com',
		'hashed_password17',
		'01712369350',
		'287 James Plain',
		'Apt. 197',
		'74221',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Christina Jensen',
		'user18@example.com',
		'hashed_password18',
		'01717897787',
		'1039 Brianna Passage Suite 274',
		NULL,
		'21781',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Jeremy Humphrey',
		'user19@example.com',
		'hashed_password19',
		'01718698768',
		'6853 Walls Cape',
		NULL,
		'38223',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Mark Elliott',
		'user20@example.com',
		'hashed_password20',
		'01711339370',
		'765 Daniel Burg',
		NULL,
		'18387',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Lawrence Walls',
		'user21@example.com',
		'hashed_password21',
		'01716434330',
		'01630 Baker Crescent',
		NULL,
		'87312',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'James Pratt',
		'user22@example.com',
		'hashed_password22',
		'01714271114',
		'880 Robertson Bridge',
		'Apt. 704',
		'74241',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Gregory Carney',
		'user23@example.com',
		'hashed_password23',
		'01712009331',
		'49181 Todd Pike Apt. 518',
		'Apt. 236',
		'58454',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Michael Gonzales',
		'user24@example.com',
		'hashed_password24',
		'01713085807',
		'5833 Clayton Crossroad',
		'Suite 801',
		'57886',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Erin Brennan',
		'user25@example.com',
		'hashed_password25',
		'01713132537',
		'19041 Jennifer Flats Suite 716',
		'Suite 119',
		'18469',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Yesenia Thompson',
		'user26@example.com',
		'hashed_password26',
		'01713039310',
		'640 Mary Route',
		'Suite 155',
		'31191',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Martha Mitchell',
		'user27@example.com',
		'hashed_password27',
		'01717577111',
		'824 Kristi Manor',
		'Suite 934',
		'22826',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Susan Patel',
		'user28@example.com',
		'hashed_password28',
		'01716981980',
		'165 Abigail Fort Suite 603',
		'Apt. 412',
		'60580',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Toni Smith',
		'user29@example.com',
		'hashed_password29',
		'01711670764',
		'618 Vincent Grove Suite 670',
		'Apt. 853',
		'08473',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Daniel Turner',
		'user30@example.com',
		'hashed_password30',
		'01714852975',
		'84802 Michelle Stravenue',
		NULL,
		'94426',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Stephen Acevedo',
		'user31@example.com',
		'hashed_password31',
		'01719507839',
		'292 Alexandria Trail',
		'Suite 073',
		'26865',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Christopher Wagner',
		'user32@example.com',
		'hashed_password32',
		'01718146594',
		'8871 Melissa Place',
		'Apt. 103',
		'29881',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Joanna Hill',
		'user33@example.com',
		'hashed_password33',
		'01712757658',
		'6412 Joyce Walks Apt. 081',
		'Suite 372',
		'50095',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Sheryl Roberts',
		'user34@example.com',
		'hashed_password34',
		'01713619879',
		'5548 Anderson Neck',
		'Apt. 965',
		'36348',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Jeremiah Alvarez',
		'user35@example.com',
		'hashed_password35',
		'01718232428',
		'559 Foster Locks Suite 933',
		'Suite 348',
		'29283',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Charles Harper',
		'user36@example.com',
		'hashed_password36',
		'01716444191',
		'4647 Kristine Fields Suite 710',
		'Apt. 914',
		'45694',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Terri Petersen',
		'user37@example.com',
		'hashed_password37',
		'01712179932',
		'92594 Emily Shoals',
		NULL,
		'28863',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Lawrence Hebert',
		'user38@example.com',
		'hashed_password38',
		'01716836419',
		'67551 Casey Squares Apt. 209',
		NULL,
		'54447',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Heather Clark',
		'user39@example.com',
		'hashed_password39',
		'01712183089',
		'52272 Willis Wall Apt. 006',
		'Apt. 281',
		'76872',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Gary Hendricks',
		'user40@example.com',
		'hashed_password40',
		'01711054225',
		'052 Werner Shoals',
		NULL,
		'79930',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Katelyn Olson',
		'user41@example.com',
		'hashed_password41',
		'01715920135',
		'1721 Hansen Lodge Suite 629',
		'Suite 219',
		'12396',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Sara Francis',
		'user42@example.com',
		'hashed_password42',
		'01713380476',
		'1644 Cynthia Pass Apt. 009',
		NULL,
		'93045',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Reginald Taylor',
		'user43@example.com',
		'hashed_password43',
		'01716778905',
		'6705 Christopher Lock',
		'Apt. 036',
		'12514',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Stephanie Williams',
		'user44@example.com',
		'hashed_password44',
		'01711468692',
		'84668 Julia Mission Apt. 823',
		'Apt. 197',
		'71804',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'David Powell',
		'user45@example.com',
		'hashed_password45',
		'01718941837',
		'081 Danielle Drives',
		'Apt. 821',
		'38232',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Abigail Hoover',
		'user46@example.com',
		'hashed_password46',
		'01714087771',
		'9115 Jon Isle',
		'Suite 788',
		'48606',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Ethan Reyes',
		'user47@example.com',
		'hashed_password47',
		'01719946079',
		'786 Rebecca Divide Suite 852',
		'Apt. 220',
		'07472',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Keith Beck',
		'user48@example.com',
		'hashed_password48',
		'01713465023',
		'457 Vargas Island Suite 853',
		'Apt. 655',
		'59275',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Adriana Andrews',
		'user49@example.com',
		'hashed_password49',
		'01719528403',
		'56938 April Creek Apt. 950',
		NULL,
		'03197',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Catherine Adams',
		'user50@example.com',
		'hashed_password50',
		'01717248874',
		'0375 Sandra Trace Suite 826',
		'Suite 973',
		'72424',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Michelle Lutz',
		'user51@example.com',
		'hashed_password51',
		'01711344765',
		'759 Good Port',
		'Apt. 866',
		'72122',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'James Allen',
		'user52@example.com',
		'hashed_password52',
		'01718050318',
		'89573 Hanson Drive Suite 324',
		NULL,
		'14189',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Kimberly Page',
		'user53@example.com',
		'hashed_password53',
		'01718083151',
		'7329 Jacobs Station',
		NULL,
		'47630',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Kimberly Conway',
		'user54@example.com',
		'hashed_password54',
		'01715161731',
		'4835 Stewart Brooks Apt. 339',
		'Apt. 871',
		'95403',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Dwayne Tucker',
		'user55@example.com',
		'hashed_password55',
		'01717315476',
		'601 Matthew Estate Suite 987',
		'Suite 867',
		'87556',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Tracy Davis',
		'user56@example.com',
		'hashed_password56',
		'01718403741',
		'180 Sosa Viaduct',
		NULL,
		'42370',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Anne Elliott',
		'user57@example.com',
		'hashed_password57',
		'01712527674',
		'14196 Kelsey Ports',
		'Apt. 442',
		'68394',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Leslie Perez',
		'user58@example.com',
		'hashed_password58',
		'01712881711',
		'47429 Harris Dale',
		'Suite 239',
		'38295',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Joshua Castillo',
		'user59@example.com',
		'hashed_password59',
		'01717690366',
		'419 Conner Street',
		NULL,
		'19109',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Steven Holloway',
		'user60@example.com',
		'hashed_password60',
		'01713931603',
		'2278 Wesley Forges',
		NULL,
		'95757',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Joyce Beck',
		'user61@example.com',
		'hashed_password61',
		'01719780333',
		'43157 Gomez Radial Suite 348',
		NULL,
		'28757',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Christopher Wilson',
		'user62@example.com',
		'hashed_password62',
		'01719108226',
		'272 Green Street',
		'Apt. 214',
		'79358',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Gabriel Hunt',
		'user63@example.com',
		'hashed_password63',
		'01718534452',
		'6828 Diana Inlet Suite 896',
		'Apt. 736',
		'25671',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Anne Morales DDS',
		'user64@example.com',
		'hashed_password64',
		'01716009007',
		'203 John Rapid Suite 618',
		NULL,
		'76317',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Craig Vasquez',
		'user65@example.com',
		'hashed_password65',
		'01718117047',
		'82938 Burke Way',
		'Suite 790',
		'65850',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'William Kramer',
		'user66@example.com',
		'hashed_password66',
		'01719349678',
		'73830 Joel Mountains',
		'Apt. 944',
		'06826',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Oscar Giles',
		'user67@example.com',
		'hashed_password67',
		'01715699103',
		'191 Wood Road Apt. 326',
		'Apt. 074',
		'38694',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Ryan Wood',
		'user68@example.com',
		'hashed_password68',
		'01715531163',
		'85515 James Hill',
		'Suite 660',
		'29997',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Billy Soto',
		'user69@example.com',
		'hashed_password69',
		'01715304627',
		'397 Moore Drive',
		'Suite 431',
		'24011',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Brenda Moon',
		'user70@example.com',
		'hashed_password70',
		'01718458891',
		'04791 Holland Courts Apt. 738',
		NULL,
		'05009',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Scott Sutton',
		'user71@example.com',
		'hashed_password71',
		'01715754604',
		'4948 Martin Road',
		'Apt. 982',
		'13124',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Marie Burton',
		'user72@example.com',
		'hashed_password72',
		'01711594768',
		'29229 Carlos Harbors',
		NULL,
		'50335',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Marcus Ray',
		'user73@example.com',
		'hashed_password73',
		'01719952970',
		'601 Maria Mission Apt. 554',
		'Suite 604',
		'23371',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Christy Davis',
		'user74@example.com',
		'hashed_password74',
		'01713743993',
		'83750 Fisher Path',
		NULL,
		'07652',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Betty Rivera',
		'user75@example.com',
		'hashed_password75',
		'01719721369',
		'41743 Berger Inlet Apt. 527',
		NULL,
		'01961',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Vincent West',
		'user76@example.com',
		'hashed_password76',
		'01719915006',
		'967 Ethan Avenue Suite 164',
		NULL,
		'60797',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Spencer Baker',
		'user77@example.com',
		'hashed_password77',
		'01715674377',
		'97420 Matthew Station Apt. 064',
		NULL,
		'54726',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Nathan Lee',
		'user78@example.com',
		'hashed_password78',
		'01713635196',
		'13577 Grace Knoll Suite 665',
		NULL,
		'69820',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Victoria Grant',
		'user79@example.com',
		'hashed_password79',
		'01717731296',
		'10867 Phillip Stravenue Apt. 604',
		'Apt. 448',
		'54558',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Michael Rogers',
		'user80@example.com',
		'hashed_password80',
		'01716940105',
		'15573 Nicholas Skyway',
		'Suite 482',
		'73684',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Jennifer Garcia',
		'user81@example.com',
		'hashed_password81',
		'01718997954',
		'3481 Oneal Cove',
		'Suite 031',
		'68833',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Jill Martin',
		'user82@example.com',
		'hashed_password82',
		'01719266465',
		'279 Ann Brook Apt. 141',
		'Suite 346',
		'62280',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Matthew Wagner',
		'user83@example.com',
		'hashed_password83',
		'01716036271',
		'60969 Justin Passage Suite 774',
		NULL,
		'06129',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Reginald Lopez',
		'user84@example.com',
		'hashed_password84',
		'01714619079',
		'5057 Lowe Brooks',
		NULL,
		'08741',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Mrs. Kelly Santana',
		'user85@example.com',
		'hashed_password85',
		'01711169619',
		'9582 Travis Mountain',
		'Suite 503',
		'16125',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Andrea Braun',
		'user86@example.com',
		'hashed_password86',
		'01717628937',
		'886 Clark Meadow',
		NULL,
		'29373',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'John Manning',
		'user87@example.com',
		'hashed_password87',
		'01711062752',
		'94678 Brown Camp',
		'Apt. 566',
		'36665',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Matthew Juarez',
		'user88@example.com',
		'hashed_password88',
		'01713360215',
		'7680 Reid Spring',
		'Suite 266',
		'67636',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Jennifer Calhoun',
		'user89@example.com',
		'hashed_password89',
		'01712769329',
		'8546 Michael Manors Suite 741',
		'Apt. 536',
		'65135',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Gerald White',
		'user90@example.com',
		'hashed_password90',
		'01713822857',
		'12903 Alejandro Pike Suite 624',
		'Suite 748',
		'63931',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'John Huang',
		'user91@example.com',
		'hashed_password91',
		'01718504312',
		'174 Turner Bypass',
		'Suite 571',
		'58354',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Matthew Calderon',
		'user92@example.com',
		'hashed_password92',
		'01713168002',
		'4836 Rodney Canyon',
		NULL,
		'04248',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Anna Smith',
		'user93@example.com',
		'hashed_password93',
		'01716858053',
		'00902 Terry Common Apt. 082',
		'Apt. 119',
		'43809',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Audrey Hoover',
		'user94@example.com',
		'hashed_password94',
		'01719253694',
		'1177 Amber Dam Suite 682',
		'Apt. 808',
		'54752',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Nicholas Vang',
		'user95@example.com',
		'hashed_password95',
		'01718369761',
		'589 Stout Garden Apt. 296',
		'Suite 458',
		'01343',
		'farmer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Adam Thomas',
		'user96@example.com',
		'hashed_password96',
		'01717515391',
		'221 Navarro Shores',
		NULL,
		'61904',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Vincent Roth',
		'user97@example.com',
		'hashed_password97',
		'01717100366',
		'55318 Thomas Glen',
		NULL,
		'01288',
		'retailer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Mark Williamson',
		'user98@example.com',
		'hashed_password98',
		'01715991677',
		'6146 Johnson Isle',
		'Apt. 606',
		'80758',
		'wholesaler'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Paula Moore',
		'user99@example.com',
		'hashed_password99',
		'01716923549',
		'41560 Perez Viaduct Apt. 458',
		'Apt. 273',
		'90338',
		'customer'
	);

INSERT INTO
	USERS (
		Name,
		Email,
		PASSWORD,
		Phone,
		AddressLine1,
		AddressLine2,
		Zip,
		UserType
	)
VALUES
	(
		'Lisa Jones',
		'user100@example.com',
		'hashed_password100',
		'01718626962',
		'040 Lauren Estate Suite 263',
		'Apt. 083',
		'86569',
		'retailer'
	);

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(2, 'female');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(3, 'female');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(6, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(13, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(15, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(22, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(26, 'female');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(28, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(32, 'female');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(40, 'other');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(46, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(53, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(54, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(61, 'female');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(62, 'other');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(65, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(67, 'other');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(68, 'female');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(71, 'other');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(83, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(85, 'female');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(86, 'male');

INSERT INTO
	FARMER (UserID, Gender)
VALUES
	(95, 'female');

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(5);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(7);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(8);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(16);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(18);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(27);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(30);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(33);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(34);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(35);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(42);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(47);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(56);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(58);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(59);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(66);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(69);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(76);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(78);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(82);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(84);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(89);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(92);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(93);

INSERT INTO
	CUSTOMER (UserID)
VALUES
	(99);

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(1, 11, '2024-03-19', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(2, 12, '2024-08-10', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(3, 17, '2025-01-30', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(4, 21, '2024-03-12', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(5, 23, '2024-10-21', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(6, 24, '2024-11-30', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(7, 25, '2023-09-16', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(8, 36, '2023-10-04', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(9, 37, '2023-11-02', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(10, 38, '2022-10-12', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(11, 44, '2022-05-09', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(12, 45, '2024-01-24', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(13, 48, '2023-10-30', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(14, 49, '2023-01-28', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(15, 55, '2024-04-28', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(16, 57, '2023-04-03', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(17, 60, '2025-03-06', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(18, 70, '2024-12-27', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(19, 72, '2024-12-19', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(20, 74, '2023-12-03', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(21, 79, '2024-10-31', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(22, 81, '2022-05-06', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(23, 91, '2025-02-13', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(24, 98, '2023-01-31', 'wholesaler');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(25, 4, '2024-11-23', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(26, 9, '2024-05-20', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(27, 10, '2024-01-16', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(28, 14, '2023-12-14', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(29, 19, '2022-12-21', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(30, 20, '2022-12-09', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(31, 29, '2025-03-03', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(32, 31, '2024-02-09', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(33, 39, '2023-11-27', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(34, 41, '2024-03-04', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(35, 43, '2025-01-06', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(36, 50, '2023-03-13', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(37, 51, '2023-05-11', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(38, 52, '2022-07-21', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(39, 63, '2025-04-07', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(40, 64, '2022-12-15', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(41, 73, '2024-09-13', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(42, 75, '2022-04-17', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(43, 77, '2023-07-25', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(44, 80, '2023-01-25', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(45, 87, '2022-09-14', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(46, 88, '2022-12-09', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(47, 90, '2023-05-07', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(48, 94, '2023-01-12', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(49, 96, '2023-12-23', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(50, 97, '2023-05-17', 'retailer');

INSERT INTO
	VENDOR (LicenseID, UserID, RegistrationDate, VendorType)
VALUES
	(51, 100, '2024-07-02', 'retailer');

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(1, 87);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(2, 23);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(3, 87);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(4, 20);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(5, 50);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(6, 51);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(7, 78);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(8, 68);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(9, 51);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(10, 42);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(11, 13);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(12, 76);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(13, 15);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(14, 34);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(15, 57);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(16, 20);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(17, 36);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(18, 77);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(19, 54);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(20, 34);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(21, 35);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(22, 42);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(23, 96);

INSERT INTO
	WHOLESALER (WLicenseID, MinOrderQuantity)
VALUES
	(24, 48);

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(25, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(26, 'tools');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(27, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(28, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(29, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(30, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(31, 'tools');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(32, 'grocery');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(33, 'grocery');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(34, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(35, 'tools');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(36, 'grocery');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(37, 'grocery');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(38, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(39, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(40, 'tools');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(41, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(42, 'grocery');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(43, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(44, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(45, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(46, 'seed shop');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(47, 'grocery');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(48, 'grocery');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(49, 'grocery');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(50, 'grocery');

INSERT INTO
	RETAILER (RLicenseID, StoreType)
VALUES
	(51, 'grocery');
